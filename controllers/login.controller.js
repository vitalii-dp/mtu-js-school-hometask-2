const User = require('../models/userModel')
const hashPassword = require('../utils/hashPassword')
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000
const checkAuth = require('../utils/checkAuth')

function checkAuthorization(req, res) {
  if (checkAuth(req)) {
    res.redirect('/')
  } else {
    res.render('loginPage')
  }
}

async function loginUser(req, res) {
  try {
    const currentUser = await User.findOne({login: req.body.login})
    if (currentUser === null) {
      return res.render('loginPage.ejs', { userError: 'User does not exist', login: req.body.login })
    }
    const match = await hashPassword.compare(req.body.password, currentUser.password)
    if (currentUser && match) {
      res.cookie('isLoggedIn', 'true', { maxAge: COOKIE_MAX_AGE })
      .cookie('currentUser', currentUser._id, { maxAge: COOKIE_MAX_AGE })
      return res.redirect('/')
    } else {
      return res.render('loginPage.ejs', { passwordError: 'Incorrect password', login: req.body.login })
    }
  } catch (error) {
    return res.status(503).send('Server error while logging in')
  }
}

module.exports = {
  checkAuthorization,
  loginUser
}