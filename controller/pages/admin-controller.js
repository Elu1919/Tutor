const adminController = {
  getUsers: (req, res, next) => {
    res.render('admin/users')
  },
  loginPage: (req, res, next) => {
    res.render('admin/login')
  },
  login: (req, res, next) => {
    res.render('admin/login',)
  }
}

module.exports = adminController