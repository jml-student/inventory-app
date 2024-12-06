const query = require('../db/queries.js')
const { body, validationResult } = require('express-validator')

const validateUser = [
  body('username')
    .trim()
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric.')
    .isLength({ min: 1, max: 10 })
    .withMessage('Username must be between 1 and 10 characters.'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long.'),
  body('password2')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.')
      }
      return true
    }),
]

function registerGet(req, res) {
  res.render('register', { errors: [], data: {} })
}

const registerPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('register', {
        errors: errors.array(),
        data: req.body,
      })
    }

    const username = req.body.username
    const password = req.body.password

    const userId = await query.insertUser(username, password)

    res.cookie('userId', userId, { httpOnly: true })
    res.redirect('/home')
  },
]

module.exports = {
  registerGet,
  registerPost,
}
