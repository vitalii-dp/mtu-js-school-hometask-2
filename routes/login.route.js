const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const hashPassword = require('../controllers/hashPassword')
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000
const checkAuth = require('../controllers/checkAuth')

router.get('/', (req, res) => {
  if (checkAuth(req)) {
    return res.redirect('/')
  } else {
    res.render('loginPage.ejs')
  }
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findOne({login: req.body.login})
    if (currentUser === null) {
      return res.render('loginPage.ejs', { userError: 'User does not exist', login: req.body.login })
    }
    const match = await hashPassword.compare(req.body.password, currentUser.password)
    if (currentUser && match) {
      res.cookie('isLoggedIn', 'true', { maxAge: COOKIE_MAX_AGE })
      .cookie('currentUser', currentUser.login, { maxAge: COOKIE_MAX_AGE })
      return res.redirect('/')
    } else {
      return res.render('loginPage.ejs', { passwordError: 'Incorrect password', login: req.body.login })
    }
  } catch (error) {
    res.status(503).send('Server error while logging in')
    res.end()
  }
})

module.exports = router