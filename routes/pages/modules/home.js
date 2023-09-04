const express = require('express')
const passport = require('../../../config/passport')
const homeController = require('../../../controller/pages/home-controller')
const userController = require('../../../controller/pages/user-controller')

const router = express.Router()

router.get('/', homeController.gethome)
router.post('/search', homeController.search)

router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/logout', userController.logout)

module.exports = router