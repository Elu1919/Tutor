const express = require('express')
const { authenticatedAdmin } = require('../../../middleware/auth')
const adminController = require('../../../controller/pages/admin-controller')

const router = express.Router()

router.get('/users', authenticatedAdmin, adminController.getUsers)

module.exports = router