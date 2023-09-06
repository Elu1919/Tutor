const { User } = require('../../models')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const adminController = {
  getUsers: (req, res, next) => {
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    User.findAll({
      limit,
      offset,
      nest: true,
      raw: true
    })
      .then(users => res.render('admin/users', {
        users,
        pagination: getPagination(limit, page, users.count)
      }))
      .catch(err => next(err))
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

module.exports = adminController