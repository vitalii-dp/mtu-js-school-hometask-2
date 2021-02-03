const User = require('../models/userModel')
const hashPassword = require('../utils/hashPassword')
const validateUser = require('../utils/validateUser')
const checkAuth = require('../utils/checkAuth')
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000

function checkAuthorization(req, res) {
  if (checkAuth(req)) {
    res.redirect('/')
  } else {
    res.render('registerPage')
  }
}

async function registerUser(req, res) {
  try {
    const currentUser = req.body
    const matchedUser = await User.findOne({ login: currentUser.login })
    if (matchedUser) {
      return res.render('registerPage.ejs', { error: 'User already exist', login: currentUser.login, name: currentUser.name })
    }
    if (validateUser(currentUser) !== 'Validated') {
      return res.render('registerPage.ejs', { error: validateUser(currentUser), login: currentUser.login, name: currentUser.name })
    }
    const hashedPassword = await hashPassword.hash(req.body.password.trim())
    const user = new User({
      name: currentUser.name.trim(),
      login: currentUser.login.trim(),
      password: hashedPassword,
      userIp: req.ip
    })
    const newUser = await user.save()
    res.cookie('isLoggedIn', 'true', { maxAge: COOKIE_MAX_AGE })
      .cookie('currentUser', newUser._id, { maxAge: COOKIE_MAX_AGE })
    return res.redirect('/')
  } catch (error) {
    return res.status(503).send('Server error: could not save new user')
  }
}

module.exports = {
  checkAuthorization,
  registerUser
}