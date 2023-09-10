const userServices = require('../../services/user-services')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { User, ClassRecord, Lesson } = require('../../models')

const userController = {
  loginPage: (req, res, next) => {
    res.render('login')
  },
  login: (req, res, next) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/')
  },
  signUpPage: (req, res, next) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '成功註冊帳號！')
      req.session.createdData = data
      res.redirect('/login')
    })
  },
  logout: (req, res, next) => {
    req.logout(err => {
      if (err) return next(err)
    })
    res.redirect('/login')
  },
  getUser: async (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.render('user', data))
  },
  editUser: (req, res, next) => {
    const user = req.user
    if (user.id !== parseInt(req.params.id)) throw new Error("不可編輯別人的個人資訊!!")
    res.render('user-edit')
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) => {
      if (err) return next(err)
      const user = req.user
      req.flash('success_messages', '資訊修改成功！')
      req.session.update = data
      res.redirect(`/users/${req.params.id}`)
    })
  }
}

module.exports = userController