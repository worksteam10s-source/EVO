const fs = require('fs');
const path = require('path');

const tables = [
  "admin",
  "USER",
  "students",
  "doctor",
  "student_affairs",
  "specialization",
  "semesters",
  "study_plan",
  "course",
  "lecture",
  "building",
  "lecture_materials",
  "assignment",
  "enrollments",
  "grade",
  "attendance",
  "live",
  "faq",
  "messages",
  "news",
  "library",
  "student_request",
  "request_type",
  "control",
  "upload_grades"
];

const routesDir = path.join(__dirname, '..', 'routes');

if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir);
}

tables.forEach(tableName => {
  const filePath = path.join(routesDir, `${tableName}.js`);
  
  const content = `const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "${tableName}"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from ${tableName}:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "${tableName}" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from ${tableName}:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    // Note: You must update the INSERT columns and values according to your schema
    // const result = await runQuery('INSERT INTO "${tableName}" (col1, col2) VALUES ($1, $2) RETURNING *', [val1, val2]);
    res.status(501).json({ status: 'error', error: 'Create method not fully implemented. Please update columns.' });
  } catch (error) {
    console.error('Error inserting data into ${tableName}:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    // Note: You must update the UPDATE columns and values according to your schema
    // const result = await runQuery('UPDATE "${tableName}" SET col1 = $1 WHERE id = $2 RETURNING *', [val1, req.params.id]);
    res.status(501).json({ status: 'error', error: 'Update method not fully implemented. Please update columns.' });
  } catch (error) {
    console.error('Error updating data in ${tableName}:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "${tableName}" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from ${tableName}:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
`;

  // Only write if file doesn't exist to prevent overwriting custom logic later
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created route file: ${tableName}.js`);
  } else {
    console.log(`Skipped (already exists): ${tableName}.js`);
  }
});

console.log('Finished generating routes.');
