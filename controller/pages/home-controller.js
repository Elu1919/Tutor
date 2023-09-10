const homeServices = require('../../services/home-services')

const homeController = {
  gethome: (req, res, next) => {
    homeServices.gethome(req, (err, data) => err ? next(err) : res.render('home', data))
  },
  search: (req, res, next) => {
    homeServices.search(req, (err, data) => err ? next(err) : res.render('home', data))
  }
}

module.exports = homeController