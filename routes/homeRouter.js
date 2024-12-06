const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController')

homeRouter.get('/', homeController.homeGet)
homeRouter.post('/', homeController.homePost)
homeRouter.post('/save-item', homeController.saveItem)

homeRouter.get('/:symbol', homeController.symbolGet)

module.exports = homeRouter
