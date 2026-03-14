const express = require('express');
const router = express.Router();
const { getAll } = require('./db.js');

router.get('/', async (req, res) => {
  try {
    const tables = await getAll("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';");
    res.json({ 
      status: 'success',
      tables: tables.map(t => t.table_name)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
