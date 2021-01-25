const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const hashPassword = require('../controllers/hashPassword')
const validateUser = require('../controllers/validateUser')
const checkAuth = require('../controllers/checkAuth')
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000

router.get('/', (req, res) => {
  if (checkAuth(req)) {
    res.redirect('/')
  } else {
    res.render('registerPage')
  }
})


router.post('/', async (req, res) => {
  const matchedUser = await User.findOne({ login: req.body.login })
  if (matchedUser) {
    res.render('registerPage.ejs', { error: 'User already exist', login: req.body.login, name: req.body.name })
  }
  if (validateUser(req.body) !== 'Validated') {
    return res.render('registerPage.ejs', { error: validateUser(req.body), login: req.body.login, name: req.body.name })
  }
  const hashedPassword = await hashPassword.hash(req.body.password.trim())
  const user = new User({
    name: req.body.name.trim(),
    login: req.body.login.trim(),
    password: hashedPassword,
    userIp: req.ip
  })
  try {
    const newUser = await user.save()
    res.cookie('isLoggedIn', 'true', { maxAge: COOKIE_MAX_AGE })
    .cookie('currentUser', newUser.login, { maxAge: COOKIE_MAX_AGE })
    res.redirect('/')
  } catch (error) {
    res.status(503).send('Server error: could not save new user')
    res.end()
  }
})

module.exports = router