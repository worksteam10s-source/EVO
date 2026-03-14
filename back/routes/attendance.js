const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "attendance"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from attendance:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "attendance" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from attendance:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { student_id, lecture_id, join_time, leave_time, duration, status } = req.body;
    const result = await runQuery('INSERT INTO "attendance" (student_id, lecture_id, join_time, leave_time, duration, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.student_id, req.body.lecture_id, req.body.join_time, req.body.leave_time, req.body.duration, req.body.status]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into attendance:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { student_id, lecture_id, join_time, leave_time, duration, status } = req.body;
    const result = await runQuery('UPDATE "attendance" SET student_id = $1, lecture_id = $2, join_time = $3, leave_time = $4, duration = $5, status = $6 WHERE id = $7 RETURNING *', [req.body.student_id, req.body.lecture_id, req.body.join_time, req.body.leave_time, req.body.duration, req.body.status, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in attendance:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "attendance" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from attendance:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
