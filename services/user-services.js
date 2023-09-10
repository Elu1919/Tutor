const bcrypt = require('bcryptjs')
const moment = require('moment')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { User, ClassRecord, Lesson } = require('../models')

const userServices = {
  login: (req, res, next) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/')
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
  getUser: async (req, cb) => {
    try {
      const records = await ClassRecord.findAll({
        where: {
          student_id: req.params.id
        },
        include: [
          {
            model: Lesson,
            as: 'classInfo',
          },
          {
            model: User,
            as: 'classTeacher',
          }
        ],
        order: [
          ['start_time', 'ASC']
        ],
        nest: true,
        raw: true
      })
      const recordData = records.map(record => (
        {
          ...record,
          date: {
            now: parseInt(moment(new Date()).format("YYYYMMDDHHmmss")),
            end: parseInt(moment(record.end_time).format("YYYYMMDDHHmmss"))
          },
          start_time: moment(record.start_time).format("YYYY-MM-DD HH:mm"),
          end_time: moment(record.end_time).format("HH:mm | dddd"),
          finished_at: moment(record.end_time).format("[finished at] YYYY-MM-DD"),
        }
      ))
      return cb(null, { records: recordData })
    }
    catch (err) {
      cb(err)
    }
  },
  editUser: (req, res, next) => {
    res.render('user-edit')
  },
  putUser: (req, res, next) => {
    const { name, info } = req.body
    const { file } = req
    Promise.all([
      User.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User didn't exist!")
        return user.update({
          name,
          info,
          avatar: filePath || user.avatar
        })
      })
      .then(() => {
        req.flash('success_messages', '資訊修改成功！')
        res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  }
}

module.exports = userServices