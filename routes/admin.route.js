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
  const usersPerPage = 10
  const page = parseInt(req.params.page) || 1
  const nameQuery = { name: { $regex: searchQuery || '', $options: 'gi' } }
  const loginQuery = { login: { $regex: searchQuery || '', $options: 'gi' } }
  try {
    const usersOnPage = await User.find({ $or: [nameQuery, loginQuery] })
      .skip((usersPerPage * page) - usersPerPage)
      .limit(usersPerPage)
    const totalUsers = await User.find({ $or: [nameQuery, loginQuery] })
      .countDocuments()
    const totalPages = Math.ceil(totalUsers / usersPerPage)
    if (page !== 1 && page > totalPages) {
      return res.redirect('/admin/users/1')
    } else {
      return res.render('adminPage.ejs', { users: usersOnPage, currentPage: page, pages: totalPages, searchQuery })
    }
  } catch (error) {
    res.status(503).send('Could not get users list from database at this time. Try again later.')
  }
})

router.post('/toggleRole', async (req, res) => {
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