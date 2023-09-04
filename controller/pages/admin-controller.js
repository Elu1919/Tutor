const adminController = {
  getUsers: (req, res, next) => {
    res.render('admin/users')
  },
  loginPage: (req, res, next) => {
    res.render('admin/login')
  },
  login: (req, res, next) => {
    req.flash('success_messages', '成功登入！')
    res.render('admin/users')
  },
  logout: (req, res, next) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('admin/login')
  }
}

module.exports = adminController