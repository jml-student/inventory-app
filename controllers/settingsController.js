const query = require('../db/queries.js')

async function settingsGet(req, res) {
  const userId = req.cookies.userId
  const user = await query.getUserWithId(userId)

  res.render('settings', { user: user, userId: userId, msg: [] })
}

async function settingsPost(req, res) {
  const userId = req.cookies.userId
  const username = req.body.settingsUsername
  const password = req.body.settingsPassword

  try {
    const userId = req.cookies.userId
    const user = await query.getUserWithId(userId)

    await query.updateUser(userId, username, password)

    res.render('settings', {
      user: user,
      userId: userId,
      msg: ['Username and password updated successfully'],
    })
  } catch (err) {
    console.error('Error updating user:', err)
  }
}

async function deleteAccount(req, res) {
  const userId = req.cookies.userId

  await query.deleteUser(userId)

  res.redirect('/register')
}

module.exports = {
  settingsGet,
  settingsPost,
  deleteAccount,
}
