const passport = require('../config/passport')

const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

const authenticatedTeacher = (req, res, next) => {
  if ((req.user && req.user.is_teacher) || (req.user && req.user.is_admin)) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

module.exports = {
  authenticated,
  authenticatedAdmin,
  authenticatedTeacher
}