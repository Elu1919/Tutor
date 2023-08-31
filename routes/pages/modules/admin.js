const express = require('express')
const adminController = require('../../../controller/pages/admin-controller')

const router = express.Router()

router.get('/', adminController.getUsers)

router.get('/login', adminController.loginPage)
router.post('/login', adminController.login)

module.exports = router