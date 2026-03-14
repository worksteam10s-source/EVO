const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "USER"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from USER:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "USER" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from USER:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { name, password, role, remember_token, last_login, created_at, updated_at } = req.body;
    const result = await runQuery('INSERT INTO "user" (name, password, role, remember_token, last_login, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.name, req.body.password, req.body.role, req.body.remember_token, req.body.last_login, req.body.created_at, req.body.updated_at]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into USER:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, password, role, remember_token, last_login, created_at, updated_at } = req.body;
    const result = await runQuery('UPDATE "user" SET name = $1, password = $2, role = $3, remember_token = $4, last_login = $5, created_at = $6, updated_at = $7 WHERE id = $8 RETURNING *', [req.body.name, req.body.password, req.body.role, req.body.remember_token, req.body.last_login, req.body.created_at, req.body.updated_at, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in USER:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "USER" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from USER:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
