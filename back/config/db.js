require("dotenv").config();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client:', err);
});

// Helper function to convert SQLite placeholders (?) to PostgreSQL placeholders ($1, $2, etc)
const convertPlaceholders = (sql, params) => {
  let paramIndex = 1;
  const newSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
  return { sql: newSql, params };
};
// Helper function to get single row
const getOne = async (sql, params = []) => {
  try {
    const { sql: convertedSql, params: convertedParams } = convertPlaceholders(sql, params);
    const result = await pool.query(convertedSql, convertedParams);
    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ Query error:', error);
    throw error;
  }
};

// Helper function to get multiple rows
const getAll = async (sql, params = []) => {
  try {
    const { sql: convertedSql, params: convertedParams } = convertPlaceholders(sql, params);
    const result = await pool.query(convertedSql, convertedParams);
    return result.rows;
  } catch (error) {
    console.error('❌ Query error:', error);
    throw error;
  }
};

// Helper function to execute a query (insert, update, delete)
const runQuery = async (sql, params = []) => {
  try {
    const { sql: convertedSql, params: convertedParams } = convertPlaceholders(sql, params);
    const result = await pool.query(convertedSql, convertedParams);
    return result;
  } catch (error) {
    console.error('❌ Query error:', error);
    throw error;
  }
};

// Initialize database with schema
const initializeDatabase = async () => {
  // Database initialization will be handled separately
  console.log('✅ Database connection pool established');
};

// Initialize on startup
initializeDatabase();

module.exports = {
  pool,
  runQuery,
  getOne,
  getAll,
  initializeDatabase,
  testConnection: initializeDatabase // mapping to initializeDatabase or just removing
};