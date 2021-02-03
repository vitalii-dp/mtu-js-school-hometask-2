const express = require('express')
const router = express.Router()
const testController = require('../../controllers/test.controller')

router.post('/', testController.palindromeController)

module.exports = router