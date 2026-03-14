const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "faq"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from faq:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "faq" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from faq:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { question, answer, is_active, rating, student_id, doctor_id } = req.body;
    const result = await runQuery('INSERT INTO "faq" (question, answer, is_active, rating, student_id, doctor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.question, req.body.answer, req.body.is_active, req.body.rating, req.body.student_id, req.body.doctor_id]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into faq:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { question, answer, is_active, rating, student_id, doctor_id } = req.body;
    const result = await runQuery('UPDATE "faq" SET question = $1, answer = $2, is_active = $3, rating = $4, student_id = $5, doctor_id = $6 WHERE id = $7 RETURNING *', [req.body.question, req.body.answer, req.body.is_active, req.body.rating, req.body.student_id, req.body.doctor_id, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in faq:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "faq" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from faq:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
