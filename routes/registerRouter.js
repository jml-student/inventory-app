const express = require('express')
const registerRouter = express.Router()
const registerController = require('../controllers/registerController')

registerRouter.get('/', registerController.registerGet)
registerRouter.post('/', registerController.registerPost)

module.exports = registerRouter
