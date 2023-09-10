const { Lesson } = require('../models')
const { Op } = require("sequelize")
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const homeServices = {
  gethome: (req, cb) => {
    const DEFAULT_LIMIT = 6
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Lesson.findAndCountAll({
      limit,
      offset,
      nest: true,
      raw: true
    })
      .then(lessons => {
        const data = lessons.rows.map(lesson => ({
          ...lesson,
          info: lesson.info.substring(0, 150),
          style: lesson.style.substring(0, 50)
        }))
        return cb(null, {
          lessons: data,
          pagination: getPagination(limit, page, lessons.count)
        })
      })
      .catch(err => cb(err))
  },
  search: (req, res, next) => {
    const keyword = req.query.keyword
    const DEFAULT_LIMIT = 6
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Lesson.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { info: { [Op.like]: `%${keyword}%` } },
          { style: { [Op.like]: `%${keyword}%` } },
        ]
      },
      limit,
      offset,
      nest: true,
      raw: true
    })
      .then(lessons => {
        const data = lessons.rows.map(lesson => ({
          ...lesson,
          info: lesson.info.substring(0, 50),
          style: lesson.style.substring(0, 25)
        }))
        return res.render('home', {
          lessons: data,
          pagination: getPagination(limit, page, lessons.count),
          keyword
        })
      })
  }
}

module.exports = homeServices