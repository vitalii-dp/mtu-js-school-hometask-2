const User = require('../models/userModel')
const checkAuth = require('../utils/checkAuth')

async function getUserInfo(req, res) {
  if (checkAuth(req)) {
    try {
      const currentUser = await User.findOne({ _id: req.cookies.currentUser })
      const response = {
        topResult: currentUser.topResult,
        userName: currentUser.name,
        userRole: currentUser.role
      }
      return res.send(JSON.stringify(response))
    } catch (error) {
      return res.status(503).send('Server error: could not load user result')
    }
  } else {
    return res.redirect('/404')
  }
}

module.exports = {
  getUserInfo
}