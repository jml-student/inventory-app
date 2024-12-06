const express = require('express')
const indexRouter = express.Router()
const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.indexGet)
indexRouter.post('/', indexController.indexPost)

module.exports = indexRouter
