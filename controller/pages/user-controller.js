const bcrypt = require('bcryptjs')
const { User } = require('../../models')

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
    bcrypt.hash(req.body.password, 10)
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        is_teacher: false,
        avatar: 'https://upload.cc/i1/2023/08/27/bex9jv.png',
        info: '',
        total_lesson_time: 0,
        week_lesson_time: 0
      }))
      .then(() => {
        res.redirect('/login')
      })
  },
  logout: (req, res, next) => {
    res.render('home')
  },
}

module.exports = userController