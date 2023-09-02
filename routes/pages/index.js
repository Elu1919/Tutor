const express = require('express')
const router = express.Router()

const { generalErrorHandler } = require('../../middleware/error-handler')
const home = require('./modules/home')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.use('/', home)

router.use('/', generalErrorHandler)


module.exports = router