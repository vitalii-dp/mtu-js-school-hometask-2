const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const error = new Error
  error.statusCode = 500
  error.message = 'Something went wrong, but it is not your fault. Try again later'
  throw new Error(error)
})

module.exports = router