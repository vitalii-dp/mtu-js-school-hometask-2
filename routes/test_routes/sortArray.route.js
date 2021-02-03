const express = require('express')
const router = express.Router()
const testController = require('../../controllers/test.controller')

router.post('/', testController.sortArrayController)

module.exports = router