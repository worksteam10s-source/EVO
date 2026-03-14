const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "live"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from live:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "live" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from live:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { title, student_id, doctor_id, lec_id, course_id, start_date, end_date } = req.body;
    const result = await runQuery('INSERT INTO "live" (title, student_id, doctor_id, lec_id, course_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.title, req.body.student_id, req.body.doctor_id, req.body.lec_id, req.body.course_id, req.body.start_date, req.body.end_date]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into live:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, student_id, doctor_id, lec_id, course_id, start_date, end_date } = req.body;
    const result = await runQuery('UPDATE "live" SET title = $1, student_id = $2, doctor_id = $3, lec_id = $4, course_id = $5, start_date = $6, end_date = $7 WHERE id = $8 RETURNING *', [req.body.title, req.body.student_id, req.body.doctor_id, req.body.lec_id, req.body.course_id, req.body.start_date, req.body.end_date, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in live:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "live" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from live:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
