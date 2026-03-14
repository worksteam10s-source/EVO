const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "enrollments"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from enrollments:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "enrollments" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from enrollments:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { student_id, course_id, spec_id, date_end } = req.body;
    const result = await runQuery('INSERT INTO "enrollments" (student_id, course_id, spec_id, date_end) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.student_id, req.body.course_id, req.body.spec_id, req.body.date_end]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into enrollments:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { student_id, course_id, spec_id, date_end } = req.body;
    const result = await runQuery('UPDATE "enrollments" SET student_id = $1, course_id = $2, spec_id = $3, date_end = $4 WHERE id = $5 RETURNING *', [req.body.student_id, req.body.course_id, req.body.spec_id, req.body.date_end, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in enrollments:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "enrollments" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from enrollments:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
