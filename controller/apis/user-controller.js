const userServices = require('../../services/user-services')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const userController = {
  loginPage: (req, res, next) => {
    res.render('login')
  },
  login: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  },
  signUpPage: (req, res, next) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('密碼 與 確認密碼 需要輸入相同！')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('此 Email 已經註冊！')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/login')
      })
      .catch(err => next(err))
  },
  logout: (req, res, next) => {
    req.logout(err => {
      if (err) return next(err)
    })
    res.redirect('/login')
  },
  getUser: async (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = userController