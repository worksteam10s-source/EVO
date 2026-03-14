const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../config/db.js');
const authenticateToken = require('../middleware/auth.js');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// GET all records
router.get('/', async (req, res) => {
  try {
    const data = await getAll('SELECT * FROM "upload_grades"');
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from upload_grades:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await getOne('SELECT * FROM "upload_grades" WHERE id = $1', [req.params.id]);
    if (!data) {
      return res.status(404).json({ status: 'error', error: 'Record not found' });
    }
    res.json({ status: 'success', data });
  } catch (error) {
    console.error('Error fetching data from upload_grades:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// POST - Create a new record
router.post('/', async (req, res) => {
  try {
    const { course_id, doctor_id, control_id, spec_id, file_name, folder, year_level, status, upload_date, approval } = req.body;
    const result = await runQuery('INSERT INTO "upload_grades" (course_id, doctor_id, control_id, spec_id, file_name, folder, year_level, status, upload_date, approval) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [req.body.course_id, req.body.doctor_id, req.body.control_id, req.body.spec_id, req.body.file_name, req.body.folder, req.body.year_level, req.body.status, req.body.upload_date, req.body.approval]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data into upload_grades:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// PUT - Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { course_id, doctor_id, control_id, spec_id, file_name, folder, year_level, status, upload_date, approval } = req.body;
    const result = await runQuery('UPDATE "upload_grades" SET course_id = $1, doctor_id = $2, control_id = $3, spec_id = $4, file_name = $5, folder = $6, year_level = $7, status = $8, upload_date = $9, approval = $10 WHERE id = $11 RETURNING *', [req.body.course_id, req.body.doctor_id, req.body.control_id, req.body.spec_id, req.body.file_name, req.body.folder, req.body.year_level, req.body.status, req.body.upload_date, req.body.approval, req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ status: 'error', error: 'Record not found' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating data in upload_grades:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

// DELETE a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await runQuery('DELETE FROM "upload_grades" WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', error: 'Record not found or already deleted' });
    }
    res.json({ status: 'success', message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data from upload_grades:', error);
    res.status(500).json({ status: 'error', error: 'Database error' });
  }
});

module.exports = router;
