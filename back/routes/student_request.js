const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "student_request"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from student_request:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "student_request" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from student_request:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { student_id, type_request_id, status, create_at, viewed_by } = req.body;
    const result = await runQuery('INSERT INTO "student_request" (student_id, type_request_id, status, create_at, viewed_by) VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.body.student_id, req.body.type_request_id, req.body.status, req.body.create_at, req.body.viewed_by]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into student_request:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { student_id, type_request_id, status, create_at, viewed_by } = req.body;
    const result = await runQuery('UPDATE "student_request" SET student_id = $1, type_request_id = $2, status = $3, create_at = $4, viewed_by = $5 WHERE id = $6 RETURNING *', [req.body.student_id, req.body.type_request_id, req.body.status, req.body.create_at, req.body.viewed_by, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in student_request:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "student_request" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from student_request:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
