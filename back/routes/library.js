const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "library"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from library:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "library" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from library:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { doctor_id, title, author, isbn, category, description, pdfurl, coverimage, updated_at } = req.body;
    const result = await runQuery('INSERT INTO "library" (doctor_id, title, author, isbn, category, description, pdfurl, coverimage, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [req.body.doctor_id, req.body.title, req.body.author, req.body.isbn, req.body.category, req.body.description, req.body.pdfurl, req.body.coverimage, req.body.updated_at]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into library:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { doctor_id, title, author, isbn, category, description, pdfurl, coverimage, updated_at } = req.body;
    const result = await runQuery('UPDATE "library" SET doctor_id = $1, title = $2, author = $3, isbn = $4, category = $5, description = $6, pdfurl = $7, coverimage = $8, updated_at = $9 WHERE id = $10 RETURNING *', [req.body.doctor_id, req.body.title, req.body.author, req.body.isbn, req.body.category, req.body.description, req.body.pdfurl, req.body.coverimage, req.body.updated_at, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in library:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "library" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from library:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
