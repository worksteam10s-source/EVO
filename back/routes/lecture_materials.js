const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "lecture_materials"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from lecture_materials:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "lecture_materials" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from lecture_materials:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record (Simplified boilerplate, replace columns as needed)
router.post('/', async (req, res) => {
  try {
    const { lecture_id, name, folder, file_type, file_size, uploaded_by } = req.body;
    const result = await runQuery('INSERT INTO "lecture_material" (lecture_id, name, folder, file_type, file_size, uploaded_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.lecture_id, req.body.name, req.body.folder, req.body.file_type, req.body.file_size, req.body.uploaded_by]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into lecture_materials:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { lecture_id, name, folder, file_type, file_size, uploaded_by } = req.body;
    const result = await runQuery('UPDATE "lecture_material" SET lecture_id = $1, name = $2, folder = $3, file_type = $4, file_size = $5, uploaded_by = $6 WHERE id = $7 RETURNING *', [req.body.lecture_id, req.body.name, req.body.folder, req.body.file_type, req.body.file_size, req.body.uploaded_by, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in lecture_materials:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "lecture_materials" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from lecture_materials:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
