const { User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const adminServices = {
  getUsers: (req, cb) => {
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return User.findAndCountAll({
      limit,
      offset,
      nest: true,
      raw: true
    })
      .then(users => {
        const data = users.rows
        return cb(null, {
          users: data,
          pagination: getPagination(limit, page, users.count)
        })
      })
      .catch(cb => next(cb))
  },
  loginPage: (req, res, next) => {
    res.render('admin/login')
  },
  login: (req, res, next) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/admin/users')
  },
  logout: (req, res, next) => {
    req.logout(err => {
      if (err) return next(err)
    })
    res.redirect('/login/admin')
  }
}

module.exports = adminServices