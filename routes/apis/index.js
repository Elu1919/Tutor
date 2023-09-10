const express = require('express')

const { apiErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')

const userController = require('../../controller/apis/user-controller')
const adminController = require('../../controller/apis/admin-controller')

const home = require('./modules/home')
const admin = require('./modules/admin')
const auth = require('./modules/auth')
const teacher = require('./modules/teacher')
const user = require('./modules/user')

const router = express.Router()

router.post('/login/:admin', passport.authenticate('local', { session: false }), adminController.login)
router.post('/login', passport.authenticate('local', { session: false }), userController.login)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/logout/admin', adminController.logout)
router.get('/logout', userController.logout)

router.use('/auth', auth)

router.use('/teachers', teacher)
router.use('/users', user)
router.use('/admin', admin)
router.use('/', home)

router.use('/', apiErrorHandler)


module.exports = router