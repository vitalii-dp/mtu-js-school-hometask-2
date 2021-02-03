const User = require('../models/userModel')
const Results = require('../models/resultsModel')
const checkAuth = require('../utils/checkAuth')

function isAuthorized(req, res, next) {
  if (!checkAuth(req)) {
    return res.redirect('/404')
  } else {
    return next()
  }
}

async function getResults(req, res) {
  try {
    const topResults = await Results.find({}).sort({ score: -1 }).limit(10)
    return res.send(JSON.stringify(topResults))
  } catch (error) {
    return res.status(503).send('Server error: could not load results')
  }
}

async function updateResults(req, res) {
  try {
    const currentUser = await User.findOne({ _id: req.cookies.currentUser })
    if (currentUser.topResult < req.body.score) {
      await currentUser.updateOne({
        topResult: req.body.score
      })
      currentUser.topResult = req.body.score
    }
    await currentUser.updateOne({
      gamesCount: currentUser.gamesCount + 1
    })
    const results = new Results({
      username: currentUser.name,
      userId: currentUser._id,
      score: req.body.score
    })
    const savedResults = await results.save()
    const topResults = await Results.find({}).sort({ score: -1 }).limit(10)
    const response = {
      topResults,
      topScore: currentUser.topResult
    }
    return res.send(JSON.stringify(response)) 
  } catch (error) {
    return res.status(503).send('Server error: could not save result')
  }
}

async function deleteResults(req, res) {
  try {
    await Results.deleteMany({ userId: req.cookies.currentUser })
    const topResults = await Results.find({}).sort({ score: -1 }).limit(10)
    return res.send(JSON.stringify(topResults))
  } catch (error) {
    return res.status(503).send('Server error: could not delete results')
  }
}

module.exports = {
  isAuthorized,
  getResults,
  updateResults,
  deleteResults
}