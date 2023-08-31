const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.use('/', home)


module.exports = router