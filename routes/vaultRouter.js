const express = require('express')
const vaultRouter = express.Router()
const vaultController = require('../controllers/vaultController')

vaultRouter.get('/:id', vaultController.getVault)

module.exports = vaultRouter
