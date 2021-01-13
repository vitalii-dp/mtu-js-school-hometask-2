const express = require('express')
const router = express.Router()
const brackets = require('../services/tasks/brackets')

router.post('/brackets', (req, res) => {
  const input = req.body.data
  try {
    const result = brackets(input)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

module.exports = router