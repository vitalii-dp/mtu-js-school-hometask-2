const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')

router.use('/', adminController.isAuthorized)

router.get('/', (req, res) => {
  return res.redirect('/admin/users/1')
})

router.get('/users/:page', adminController.getUsers)
router.patch('/toggleRole', adminController.toggleUserRole)

module.exports = router