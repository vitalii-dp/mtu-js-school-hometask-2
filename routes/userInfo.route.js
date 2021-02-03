const express = require('express')
const router = express.Router()
const userInfoController = require('../controllers/userInfo.controller')

router.get('/', userInfoController.getUserInfo)

module.exports = router