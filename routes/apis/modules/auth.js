const express = require('express')
const passport = require('../../../config/passport')

const router = express.Router()

router.get('/google/cb', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

module.exports = router