const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register.controller')

router.get('/', registerController.checkAuthorization)
router.post('/', registerController.registerUser)

module.exports = router