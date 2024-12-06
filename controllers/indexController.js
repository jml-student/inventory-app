const query = require('../db/queries.js')

function indexGet(req, res) {
  res.render('index', { errors: [] })
}

async function indexPost(req, res) {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    const user = await query.getUserWithUsername(username)
    if (user) {
      if (user.username === username && user.password === password) {
        res.cookie('userId', user.id, { httpOnly: true })
        res.redirect('/home')
      } else {
        res.render('index', {
          errors: [{ msg: 'Invalid username or password' }],
        })
      }
    } else {
      res.render('index', { errors: [{ msg: 'Invalid username or password' }] })
    }
  } else {
    res.render('index', { errors: [{ msg: 'Id cookie not found' }] })
  }
}

module.exports = {
  indexGet,
  indexPost,
}
