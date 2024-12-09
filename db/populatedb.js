const { Pool } = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (255),
    password VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS favourites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  coin_symbol VARCHAR (255) NOT NULL
);
`

const pool = new Pool({
  connectionString: process.env.URL,
ssl: {
  rejectUnauthorized: false,
},
  /*host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT,*/
})

async function populateDb() {
  console.log('seeding...')
  try {
    await pool.query(SQL)
    console.log('done')
  } catch (err) {
    console.error('Error during database seeding:', err)
  } finally {
    await pool.end()
  }
}
module.exports = populateDb
