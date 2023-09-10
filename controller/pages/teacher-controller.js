const teacherServices = require('../../services/teacher-services')
const moment = require('moment')
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { Lesson, User, ClassRecord } = require('../../models')
const weekDay = [
  { id: '1', date: '星期日', en: 'Sun' },
  { id: '2', date: '星期一', en: 'Mon' },
  { id: '3', date: '星期二', en: 'Tue' },
  { id: '4', date: '星期三', en: 'Wed' },
  { id: '5', date: '星期四', en: 'Thu' },
  { id: '6', date: '星期五', en: 'Fri' },
  { id: '7', date: '星期六', en: 'Sat' },
]

const teacherController = {
  getTeacher: (req, res, next) => {
    teacherServices.getTeacher(req, (err, data) => err ? next(err) : res.render('teacher', data))
  },
  editTeacher: async (req, res, next) => {
    teacherServices.editTeacher(req, (err, data) => err ? next(err) : res.render('teacher-edit', data))
  },
  putTeacher: (req, res, next) => {
    teacherServices.putTeacher(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '資訊修改成功！')
      req.session.update = data
      res.redirect(`/teachers/${req.params.id}/personal`)
    })
  },
  createNewTeacher: (req, res, next) => {
    teacherServices.createNewTeacher(req, (err, data) => {
      const user = req.user
      if (err) return next(err)
      if (user.is_teacher) {
        req.flash('error_messages', '您已經是老師了！')
        res.redirect('/')
      }
      res.render('new-teacher', data)
    })
  },
  postNewTeacher: async (req, res, next) => {
    teacherServices.postNewTeacher(req, (err, data) => {
      const user = req.user
      if (err) return next(err)
      req.flash('success_messages', '您已成為老師！')
      req.session.createdData = data
      res.redirect(`/teachers/${user.id}/personal`)
    })
  },
  getLesson: async (req, res, next) => {
    teacherServices.getLesson(req, (err, data) => err ? next(err) : res.render('lesson', data))
  },
  putScore: async (req, res, next) => {
    teacherServices.putScore(req, (err, data) => {
      if (err) return next(err)
      const user = req.user
      req.flash('success_messages', '評分成功！')
      req.session.update = data
      res.redirect(`/users/${user.id}`)
    })
  },
  postReserve: async (req, res, next) => {
    teacherServices.postReserve(req, (err, data) => {
      if (err) return next(err)
      req.session.createdData = data
      req.flash('success_messages', `您已預約成功，上課時間：${data.startTime} ~ ${data.endTime}`)
      res.redirect(`/teachers/${data.lessonId}`)
    })
  }
}

module.exports = teacherController