const express = require('express')
const adminController = require('../../../controller/pages/admin-controller')

const router = express.Router()

router.get('/', adminController.getUsers)

module.exports = router