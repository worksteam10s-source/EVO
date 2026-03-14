const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "messages"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from messages:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "messages" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from messages:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { sender, receiver, user_id, content, send_at, is_read, reply } = req.body;
    const result = await runQuery('INSERT INTO "messages" (sender, receiver, user_id, content, send_at, is_read, reply) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.sender, req.body.receiver, req.body.user_id, req.body.content, req.body.send_at, req.body.is_read, req.body.reply]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into messages:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { sender, receiver, user_id, content, send_at, is_read, reply } = req.body;
    const result = await runQuery('UPDATE "messages" SET sender = $1, receiver = $2, user_id = $3, content = $4, send_at = $5, is_read = $6, reply = $7 WHERE id = $8 RETURNING *', [req.body.sender, req.body.receiver, req.body.user_id, req.body.content, req.body.send_at, req.body.is_read, req.body.reply, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in messages:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "messages" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from messages:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
