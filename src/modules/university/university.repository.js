const db = require('../../config/db');

async function getAll() {
  const res = await db.query('SELECT * FROM universities');
  return res.rows;
}

async function create(name, country) {
  const res = await db.query(
    'INSERT INTO universities (name, country) VALUES ($1, $2) RETURNING *',
    [name, country]
  );
  return res.rows[0];
}

module.exports = { getAll, create };