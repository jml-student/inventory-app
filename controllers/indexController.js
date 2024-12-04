const query = require('../db/queries')

async function indexGet(req, res) {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()
  res.render('index', { json: json, coin: null })
}

function indexPost(req, res) {
  const symbol = req.body.symbol
  res.redirect(`/${symbol}`)
}

async function symbolGet(req, res) {
  const symbol = req.params.symbol

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()

  const coin = json.find((coin) => coin.symbol === symbol)
  res.render('index', { json: null, coin: coin })
}

async function saveItem(req, res) {
  const symbol = req.body.symbol

  try {
    await query.insertSymbol(1, symbol)
    res.end()
  } catch (err) {
    console.error('Error saving symbol:', err)
  }
}

module.exports = {
  indexGet,
  indexPost,
  symbolGet,
  saveItem,
}
