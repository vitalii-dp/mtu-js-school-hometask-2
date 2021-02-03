// Game routes
const loginRoute = require('./login.route')
const logoutRoute = require('./logout.route')
const registerRoute = require('./register.route')
const userInfoRoute = require('./userInfo.route')
const resultsRoute = require('./results.route')
const adminRoute = require('./admin.route')

// Test routes
const romanRoute = require('./test_routes/roman.route')
const palindromeRoute = require('./test_routes/palindrome.route')
const bracketsRoute = require('./test_routes/brackets.route')
const sortArrayRoute = require('./test_routes/sortArray.route')
const nextIndexRoute = require('./test_routes/nextIndex.route')
const falsyRoute = require('./test_routes/falsyRoute.route')

module.exports = {
  loginRoute,
  logoutRoute,
  registerRoute,
  userInfoRoute,
  resultsRoute,
  adminRoute,
  romanRoute,
  palindromeRoute,
  bracketsRoute,
  sortArrayRoute,
  nextIndexRoute,
  falsyRoute
}