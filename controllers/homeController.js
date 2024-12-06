const query = require('../db/queries')

async function homeGet(req, res) {
  const userId = req.cookies.userId
  if (userId) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${process.env.APIKEY}`
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    const response = await fetch(url, options)
    const json = await response.json()

    res.render('home', { userId: req.cookies.userId, json: json, coin: null })
  } else {
    res.redirect('/')
  }
}

function homePost(req, res) {
  const symbol = req.body.symbol
  res.redirect(`/home/${symbol}`)
}

async function symbolGet(req, res) {
  const symbol = req.params.symbol
  const userId = req.cookies.userId

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${process.env.APIKEY}`
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()

  const coin = json.find((coin) => coin.symbol === symbol)
  res.render('home', { userId: userId, json: null, coin: coin })
}

async function saveItem(req, res) {
  const symbol = req.body.symbol
  const userId = req.cookies.userId

  try {
    await query.insertSymbol(userId, symbol)
    res.redirect('/home')
  } catch (err) {
    console.error('Error saving symbol:', err)
  }
}

module.exports = {
  homeGet,
  homePost,
  symbolGet,
  saveItem,
}
