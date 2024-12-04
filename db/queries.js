const pool = require('./pool')

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

module.exports = {
  insertSymbol,
}
