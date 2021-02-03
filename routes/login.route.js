const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.controller')

router.get('/', loginController.checkAuthorization)
router.post('/',loginController.loginUser)

module.exports = router