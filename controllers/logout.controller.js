module.exports = (req, res) => {
  res.clearCookie('isLoggedIn')
  res.clearCookie('currentUser')
  return res.redirect('/login')
}