const homeServices = require('../../services/home-services')

const homeController = {
  gethome: (req, res, next) => {
    homeServices.gethome(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  search: (req, res, next) => {
    homeServices.search(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = homeController