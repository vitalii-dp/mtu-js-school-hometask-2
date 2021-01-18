const express = require('express')
const router = express.Router()
const palindrome = require('../services/tasks/palindrome')

router.post('/palindrome', (req, res) => {
  const input = req.body.data
  try {
    const result = palindrome(input)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

module.exports = router