const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

// Render provides PostgreSQL through a connection string, while local development can stay simple.
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function query(text, parameters) {
  return pool.query(text, parameters);
}

module.exports = {
  pool,
  query,
};
