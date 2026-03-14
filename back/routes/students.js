const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "students"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from students:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "students" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from students:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { user_id, name, code, phone, address, department, photo, date_of_birth, age, email, status, current_semester, year_level } = req.body;
    const result = await runQuery('INSERT INTO "students" (user_id, name, code, phone, address, department, photo, date_of_birth, age, email, age, status, current_semester, year_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *', [req.body.user_id, req.body.name, req.body.code, req.body.phone, req.body.address, req.body.department, req.body.photo, req.body.date_of_birth, req.body.age, req.body.email, req.body.age, req.body.status, req.body.current_semester, req.body.year_level]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into students:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { user_id, name, code, phone, address, department, photo, date_of_birth, email, age, status, current_semester, year_level } = req.body;
    const result = await runQuery('UPDATE "students" SET user_id = $1, name = $2, code = $3, phone = $4, address = $5, department = $6, photo = $7, date_of_birth = $8, age = $9, email = $10, age = $11, status = $12, current_semester = $13, year_level = $14 WHERE id = $15 RETURNING *', [req.body.user_id, req.body.name, req.body.code, req.body.phone, req.body.address, req.body.department, req.body.photo, req.body.date_of_birth, req.body.age, req.body.email, req.body.age, req.body.status, req.body.current_semester, req.body.year_level, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in students:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "students" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from students:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
