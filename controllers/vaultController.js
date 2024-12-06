const query = require('../db/queries')

async function getVault(req, res) {
  const userId = req.cookies.userId

  const favourites = await query.getFavourites(userId)
  const symbols = favourites.map((coin) => coin.coin_symbol)

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${process.env.APIKEY}`
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  const response = await fetch(url, options)
  const json = await response.json()

  const vault = []
  json.forEach((coin) => {
    if (symbols.includes(coin.symbol)) {
      vault.push(coin)
    }
  })

  res.render('vault', { userId: userId, vault: vault })
}

module.exports = {
  getVault,
}
