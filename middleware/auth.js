const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    if (getUser(req).is_admin) return res.redirect('/admin/users')
    return next()
  }
  res.redirect('/login')
}

const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    if (getUser(req).is_admin) return next()
    res.redirect('back')
  }
  res.redirect('/login/admin')
}

const authenticatedTeacher = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    if (getUser(req).is_teacher) return next()
    res.redirect('back')
  } else {
    res.redirect('/login')
  }
}
module.exports = {
  authenticated,
  authenticatedAdmin,
  authenticatedTeacher
}