const query = require('../db/queries.js')

function indexGet(req, res) {
  res.render('index')
}

async function indexPost(req, res) {}

module.exports = {
  indexGet,
  indexPost,
}
