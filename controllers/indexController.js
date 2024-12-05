const query = require('../db/queries')

async function indexGet(req, res) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${process.env.APIKEY}`
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()

  if (!req.cookies.userId) {
    const userId = await query.insertUser()
    console.log(userId)
    res.cookie('userId', userId, { httpOnly: true })
    res.render('index', { userId: userId, json: json, coin: null })
  } else {
    res.render('index', { userId: req.cookies.userId, json: json, coin: null })
  }
}

function indexPost(req, res) {
  const symbol = req.body.symbol
  res.redirect(`/${symbol}`)
}

async function symbolGet(req, res) {
  const symbol = req.params.symbol
  const userId = req.cookies.userId

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${process.env.APIKEY}`
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()

  const coin = json.find((coin) => coin.symbol === symbol)
  res.render('index', { userId: userId, json: null, coin: coin })
}

async function saveItem(req, res) {
  const symbol = req.body.symbol
  const userId = req.cookies.userId
  console.log(userId, symbol)

  try {
    await query.insertSymbol(userId, symbol)
    res.redirect('/')
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
