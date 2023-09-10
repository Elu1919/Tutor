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
      .catch(err => cb(err))
  }
}

module.exports = adminServices