const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const checkAuth = require('../controllers/checkAuth')

router.use('/', async (req, res, next) => {
  const user = await User.findOne({ login: req.cookies.currentUser })
  if (!checkAuth(req)) {
    return res.redirect('/')
  }
  if (user.role !== 'admin') {
    return res.status(403).send('<h1>Access denied!</h1>')
  } else {
    return next()
  }
})

router.get('/', (req, res) => {
  return res.redirect('/admin/users/1')
})

router.get('/users/:page', async (req, res) => {
  const searchQuery = req.query.search
  const sortQuery = req.query.sortBy
  const [ sortBy, sortOrder ] = sortQuery ? sortQuery.split(':') : ['registrationDate', '1']
  const usersPerPage = 10
  const currentPage = parseInt(req.params.page) || 1
  const nameSearchParams = { name: { $regex: searchQuery || '', $options: 'gi' } }
  const loginSearchParams = { login: { $regex: searchQuery || '', $options: 'gi' } }
  try {
    const shownUsers = await User.find({ $or: [nameSearchParams, loginSearchParams] })
      .skip((usersPerPage * currentPage) - usersPerPage)
      .limit(usersPerPage).sort({ [sortBy]: sortOrder })
    const totalUsers = await User.find({ $or: [nameSearchParams, loginSearchParams] })
      .countDocuments()
    const totalPages = Math.ceil(totalUsers / usersPerPage)
    if (currentPage !== 1 && currentPage > totalPages) {
      return res.redirect('/admin/users/1')
    } else {
      return res.render('adminPage.ejs', { shownUsers, currentPage, totalPages, searchQuery })
    }
  } catch (error) {
    res.status(503).send(`Error: ${error.message}`)
  }
})

router.patch('/toggleRole', async (req, res) => {
  try {
    const userId = req.body.userId
    const currentUser = await User.findOne({ _id: userId })
    await currentUser.updateOne({
      role: currentUser.role === 'gamer' ? 'admin' : 'gamer'
    })
    const users = await User.find({})
    return res.render('../views/partials/tableBody.ejs', { users })
  } catch (error) {
    res.status(503).send('Error while changing role. Try again later.')
  }
})

module.exports = router