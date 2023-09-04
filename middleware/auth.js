const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
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
  res.redirect('/login')
}

const authenticatedTeacher = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    if (getUser(req).isTeacher) return next()
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