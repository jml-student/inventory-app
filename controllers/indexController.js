require('dotenv').config()

async function indexGet(req, res) {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()
  res.render('index', { json })
}

module.exports = {
  indexGet,
}
