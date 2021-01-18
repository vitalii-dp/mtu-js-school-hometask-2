const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Results = require('../models/resultsModel')
const checkAuth = require('../controllers/checkAuth')

router.use((req, res, next) => {
  if (!checkAuth(req)) {
    res.redirect('/404')
  } else {
    return next()
  }
})

router.get('/', async (req, res) => {
  try {
    const topResults = await Results.find({}).sort({ score: -1 }).limit(10)
    res.send(JSON.stringify(topResults))
  } catch (error) {
    res.status(503).send('Server error: could not load results')
  }
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findOne({ login: req.cookies.currentUser })
    if (currentUser.topResult < req.body.score) {
      await currentUser.updateOne({
        topResult: req.body.score
      })
      currentUser.topResult = req.body.score
    }
    const results = new Results({
      username: currentUser.name,
      login: req.cookies.currentUser,
      score: req.body.score
    })
    const savedResults = await results.save()
    const topResults = await Results.find({}).sort({ score: -1 }).limit(10)
    const response = {
      topResults,
      topScore: currentUser.topResult
    }
    res.send(JSON.stringify(response)) 
  } catch (error) {
    res.status(503).send('Server error: could not save result')
  }
})

router.delete('/', async (req, res) => {
  try {
    await Results.deleteMany({ login: req.cookies.currentUser })
    const topResults = await Results.find({}).sort({ score: -1 }).limit(10)
    res.send(JSON.stringify(topResults))
  } catch (error) {
    res.status(503).send('Server error: could not delete results')
  }
})

module.exports = router