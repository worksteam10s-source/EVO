const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "student_affairs"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from student_affairs:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "student_affairs" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from student_affairs:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { user_id, request_id, responsibilities, code } = req.body;
    const result = await runQuery('INSERT INTO "student_affairs" (user_id, request_id, responsibilities, code) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.user_id, req.body.request_id, req.body.responsibilities, req.body.code]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into student_affairs:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { user_id, request_id, responsibilities, code } = req.body;
    const result = await runQuery('UPDATE "student_affairs" SET user_id = $1, request_id = $2, responsibilities = $3, code = $4 WHERE id = $5 RETURNING *', [req.body.user_id, req.body.request_id, req.body.responsibilities, req.body.code, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in student_affairs:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "student_affairs" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from student_affairs:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
