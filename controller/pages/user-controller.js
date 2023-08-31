const userController = {
  loginPage: (req, res, next) => {
    res.render('login')
  },
  login: (req, res, next) => {
    res.render('login',)
  },
  signUpPage: (req, res, next) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    res.render('signup')
  },
  logout: (req, res, next) => {
    res.render('home')
  },
}

module.exports = userController