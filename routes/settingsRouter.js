const express = require('express')
const settingsRouter = express.Router()
const settingsController = require('../controllers/settingsController')

settingsRouter.get('/', settingsController.settingsGet)
settingsRouter.post('/', settingsController.settingsPost)
settingsRouter.post('/delete', settingsController.deleteAccount)

module.exports = {
  settingsRouter,
}
