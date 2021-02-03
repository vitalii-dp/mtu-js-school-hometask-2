const express = require('express')
const router = express.Router()
const resultsController = require('../controllers/results.controller')

router.use(resultsController.isAuthorized)
router.get('/', resultsController.getResults)
router.post('/', resultsController.updateResults)
router.delete('/', resultsController.deleteResults)

module.exports = router