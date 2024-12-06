const pool = require('./pool')

async function insertUser(username, password) {
  const SQL = `
    INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;
  `
  try {
    const result = await pool.query(SQL, [username, password])
    return result.rows[0].id
  } catch (err) {
    console.error('Error inserting user:', err)
  }
}

async function getUser(id) {
  const SQL = `
    SELECT * FROM users WHERE username = $1;
  `
  try {
    const result = await pool.query(SQL, [id])
    return result.rows[0]
  } catch (err) {
    console.error('Error getting user:', err)
  }
}

async function insertSymbol(userId, symbol) {
  const SQL = `
        INSERT INTO favourites (user_id, coin_symbol)
        VALUES ($1, $2);
    `

  try {
    await pool.query(SQL, [userId, symbol])
  } catch (err) {
    console.error('Error inserting symbol:', err)
  }
}

async function getFavourites(userId) {
  const SQL = `
    SELECT * FROM favourites WHERE user_id = $1;
  `
  try {
    const result = await pool.query(SQL, [userId])
    return result.rows
  } catch (err) {
    console.error('Error getting favourites:', err)
  }
}

module.exports = {
  insertUser,
  insertSymbol,
  getFavourites,
  getUser,
}
