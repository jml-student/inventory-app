//require('dotenv').config()
const { Pool } = require('pg')

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

module.exports = pool

/*require('dotenv').config()
const { Pool } = require('pg')

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})*/
