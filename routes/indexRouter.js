const express = require('express')
const indexRouter = express.Router()
const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.indexGet)
indexRouter.post('/', indexController.indexPost)
indexRouter.post('/save-item', indexController.saveItem)

indexRouter.get('/:symbol', indexController.symbolGet)

module.exports = {
  indexRouter,
}
