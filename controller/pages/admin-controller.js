const adminController = {
  getUsers: (req, res, next) => {
    res.render('admin/users')
  },
  loginPage: (req, res, next) => {
    res.render('admin/login')
  },
  login: (req, res, next) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/admin/users')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout(err => {
      if (err) return next(err)
    })
    res.redirect('admin/login')
  }
}

module.exports = adminController