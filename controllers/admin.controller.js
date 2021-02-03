const User = require('../models/userModel')
const checkAuth = require('../utils/checkAuth')

async function isAuthorized(req, res, next) {
  const currentUser = await User.findOne({ _id: req.cookies.currentUser })
  if (!checkAuth(req)) {
    return res.redirect('/')
  }
  if (currentUser.role !== 'admin') {
    return res.status(403).send('<h1>Access denied!</h1>')
  } else {
    return next()
  }
}

async function getUsers(req, res) {
  const usersPerPage = 10
  try {
    const searchQuery = req.query.search
    const sortQuery = req.query.sortBy
    const [sortBy, sortOrder] = sortQuery ? sortQuery.split(':') : ['registrationDate', '1']
    const currentPage = parseInt(req.params.page) || 1
    const nameSearchParams = { name: { $regex: searchQuery || '', $options: 'gi' } }
    const loginSearchParams = { login: { $regex: searchQuery || '', $options: 'gi' } }
    const shownUsers = await User.find({ $or: [nameSearchParams, loginSearchParams] })
      .skip((usersPerPage * currentPage) - usersPerPage)
      .limit(usersPerPage)
      .sort({ [sortBy]: sortOrder })
    const totalUsers = await User.find({ $or: [nameSearchParams, loginSearchParams] })
      .countDocuments()
    const totalPages = Math.ceil(totalUsers / usersPerPage)
    if (currentPage !== 1 && currentPage > totalPages) {
      return res.redirect('/admin/users/1')
    } else {
      return res.render('adminPage.ejs', { shownUsers, currentPage, totalPages, searchQuery })
    }
  } catch (error) {
    return res.status(503).send(`Error: ${error.message}`)
  }
}

async function toggleUserRole(req, res) {
  try {
    const userId = req.body.userId
    const currentUser = await User.findOne({ _id: userId })
    await currentUser.updateOne({
      role: currentUser.role === 'gamer' ? 'admin' : 'gamer'
    })
    const users = await User.find({})
    return res.render('../views/partials/tableBody.ejs', { users })
  } catch (error) {
    return res.status(503).send('Error while changing role. Try again later.')
  }
}

module.exports = {
  isAuthorized,
  getUsers,
  toggleUserRole
}