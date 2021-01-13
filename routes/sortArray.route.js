const express = require('express')
const router = express.Router()
const sortArray = require('../services/tasks/sortArray')

router.post('/sortArray', (req, res) => {
  const {initialArray, comparedArray} = req.body.data
  try {
    const result = sortArray(initialArray, comparedArray)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

module.exports = router