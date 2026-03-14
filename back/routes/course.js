const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "course"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from course:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "course" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from course:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { name, description, credit_hours, specialization_id, doctor_id, year_level } = req.body;
    const result = await runQuery('INSERT INTO "course" (name, description, credit_hours, specialization_id, doctor_id, year_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.name, req.body.description, req.body.credit_hours, req.body.specialization_id, req.body.doctor_id, req.body.year_level]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into course:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, credit_hours, specialization_id, doctor_id, year_level } = req.body;
    const result = await runQuery('UPDATE "course" SET name = $1, description = $2, credit_hours = $3, specialization_id = $4, doctor_id = $5, year_level = $6 WHERE id = $7 RETURNING *', [req.body.name, req.body.description, req.body.credit_hours, req.body.specialization_id, req.body.doctor_id, req.body.year_level, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in course:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "course" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from course:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
