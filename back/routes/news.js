const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "news"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from news:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "news" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from news:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { user_id, title, content, img_url, type_size, created_at, author } = req.body;
    const result = await runQuery('INSERT INTO "news" (user_id, title, content, img_url, type_size, created_at, author) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.user_id, req.body.title, req.body.content, req.body.img_url, req.body.type_size, req.body.created_at, req.body.author]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into news:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { user_id, title, content, img_url, type_size, created_at, author } = req.body;
    const result = await runQuery('UPDATE "news" SET user_id = $1, title = $2, content = $3, img_url = $4, type_size = $5, created_at = $6, author = $7 WHERE id = $8 RETURNING *', [req.body.user_id, req.body.title, req.body.content, req.body.img_url, req.body.type_size, req.body.created_at, req.body.author, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in news:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "news" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from news:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
