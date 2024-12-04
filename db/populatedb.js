const { Pool } = require('pg')

async function populateDb() {
  const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
    );

    CREATE TABLE IF NOT EXISTS favourites (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      coin_symbol VARCHAR (255) NOT NULL
    );
    `

  const pool = new Pool()

  try {
    await pool.query(SQL)
    console.log('Database created successfully')
  } catch (err) {
    console.error('Error creating database:', err)
  } finally {
    await pool.end()
  }
}

module.exports = {
  populateDb,
}
