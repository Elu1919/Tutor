const { Lesson } = require('../../models')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const homeController = {
  gethome: (req, res, next) => {
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
          info: lesson.info.substring(0, 50),
          style: lesson.style.substring(0, 25)
        }))
        return res.render('home', {
          lessons: data,
          pagination: getPagination(limit, page, lessons.count)
        })
      })
  },
  search: (req, res, next) => {
    res.render('home')
  }
}

module.exports = homeController