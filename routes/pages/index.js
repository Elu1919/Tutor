const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/auth')
const { generalErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const userController = require('../../controller/pages/user-controller')
const adminController = require('../../controller/pages/admin-controller')
const home = require('./modules/home')
const admin = require('./modules/admin')

router.get('/login/admin', adminController.loginPage)
router.get('/login', userController.loginPage)

router.post('/login/:admin', passport.authenticate('local', { failureRedirect: '/login/admin', failureFlash: true }), adminController.login)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/logout/admin', adminController.logout)
router.get('/logout', userController.logout)

router.use('/admin', admin)
router.use('/', authenticated, home)

router.use('/', generalErrorHandler)


module.exports = router