const express = require('express')
const router = express.Router()
const nextIndex = require('../services/tasks/nextIndex')

router.post('/nextIndex', (req, res) => {
  const {nums, target} = req.body.data
  try {
    const result = nextIndex(nums, target)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

module.exports = router