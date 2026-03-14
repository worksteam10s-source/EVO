const fs = require('fs');
const path = require('path');

const sqlPath = 'e:/Projects/EVO/back/utils/sestem.sql';
const routesDir = 'e:/Projects/EVO/back/routes';

// 1. Parse SQL for tables and columns
const sql = fs.readFileSync(sqlPath, 'utf8');
const tables = {};
let rawTables = sql.split('CREATE TABLE');
rawTables.shift();

rawTables.forEach(t => {
    let tableName = t.substring(0, t.indexOf('(')).trim().toLowerCase();
    let fieldsStr = t.substring(t.indexOf('(') + 1, t.lastIndexOf(')'));
    let lines = fieldsStr.split(',\n').map(l => l.trim()).filter(l => l !== '');
    
    let columns = [];
    lines.forEach(line => {
        let upperLine = line.toUpperCase();
        if (!upperLine.startsWith('FOREIGN KEY') && !upperLine.includes('PRIMARY KEY')) {
            let parts = line.split(/\s+/);
            if(parts.length >= 2) {
               columns.push(parts[0].toLowerCase());
            }
        }
    });
    // usually ID is primary key and auto increment, we don't insert/update it
    columns = columns.filter(c => c !== 'id');
    tables[tableName] = columns;
});

// 2. Process each JS file in routes
const files = fs.readdirSync(routesDir);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    
    const routeName = file.replace('.js', '').toLowerCase();
    const filePath = path.join(routesDir, file);
    let js = fs.readFileSync(filePath, 'utf8');
    
    // Check if table exists
    let cols = tables[routeName];
    if (!cols && routeName === 'user') cols = tables['user'];
    if (!cols) {
        console.log(`Skipping ${file} - no matching table found in SQL.`);
        return;
    }
    
    // Build SQL INSERT string
    const colList = cols.join(', ');
    const valList = cols.map((_, i) => `$${i + 1}`).join(', ');
    const reqBodyExtract = cols.map(c => `req.body.${c}`).join(', ');
    
    const insertReplacement = `
    const { ${cols.join(', ')} } = req.body;
    const result = await runQuery('INSERT INTO "${routeName}" (${colList}) VALUES (${valList}) RETURNING *', [${reqBodyExtract}]);
    res.status(201).json({ status: 'success', data: result.rows[0] });`;

    // Build SQL UPDATE string
    const updateSets = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');
    const updateReplacement = `
    const { ${cols.join(', ')} } = req.body;
    const result = await runQuery('UPDATE "${routeName}" SET ${updateSets} WHERE id = $${cols.length + 1} RETURNING *', [${reqBodyExtract}, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });`;

    // Replace POST block
    let postRegex = /\/\/ Note: You must update the INSERT columns[\s\S]*?res\.status\(501\)\.json\([^)]*\);/m;
    if (postRegex.test(js)) {
        js = js.replace(postRegex, insertReplacement.trim());
    }

    // Replace PUT block
    let putRegex = /\/\/ Note: You must update the UPDATE columns[\s\S]*?res\.status\(501\)\.json\([^)]*\);/m;
    if (putRegex.test(js)) {
        js = js.replace(putRegex, updateReplacement.trim());
    }
    
    // The GET methods are already generic: SELECT * FROM "table"
    // So we don't need to change GET all, GET one, or DELETE.

    fs.writeFileSync(filePath, js, 'utf8');
    console.log(`Updated ${file} with columns: ${cols.join(', ')}`);
});
