const express = require('express')
const router = express.Router()
const { vaultController } = require('../controllers/vaultController')

router.get('/', vaultController.getVault)
