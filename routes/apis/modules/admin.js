const express = require('express')
const adminController = require('../../../controller/apis/admin-controller')

const router = express.Router()

router.get('/users', adminController.getUsers)

module.exports = router