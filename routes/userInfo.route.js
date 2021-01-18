const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const checkAuth = require('../controllers/checkAuth')

router.get('/', async (req, res) => {
  if (checkAuth(req)) {
    try {
      const currentUser = await User.findOne({login: req.cookies.currentUser})
      const response = {
        topResult: currentUser.topResult,
        userName: currentUser.name
      }
      res.send(JSON.stringify(response))
    } catch (error) {
      res.status(503).send('Server error: could not load user result')
    }
  } else {
    res.redirect('/404')
  }
})

module.exports = router