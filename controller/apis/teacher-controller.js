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
    teacherServices.getTeacher(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  editTeacher: async (req, res, next) => {
    teacherServices.editTeacher(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putTeacher: (req, res, next) => {
    teacherServices.putTeacher(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  createNewTeacher: (req, res, next) => {
    teacherServices.createNewTeacher(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postNewTeacher: async (req, res, next) => {
    teacherServices.postNewTeacher(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getLesson: async (req, res, next) => {
    teacherServices.getLesson(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putScore: async (req, res, next) => {
    teacherServices.putScore(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postReserve: async (req, res, next) => {
    const user = req.user ? req.user : []
    const { reserve } = req.body

    try {
      const lesson = await Lesson.findByPk(req.params.id, { raw: true })
      if (user.id === lesson.teacher_id) throw new Error('您不可預約自己開的課!!')

      const date = reserve.split(',')
      const start_time = new Date(date[0], date[1] - 1, date[2], date[3], date[4])
      const end_time = new Date(date[0], date[1] - 1, date[2], date[3], date[4] + lesson.time)
      const startTime = moment(start_time).format("YYYY-MM-DD HH:mm")
      const endTime = moment(end_time).format("HH:mm | dddd")

      const record = await ClassRecord.findAll({
        where: {
          lesson_id: lesson.id,
          start_time: start_time
        },
        raw: true
      })
      if (record.length) throw new Error('此時段已被預約，請重新選擇時段!!')

      await ClassRecord.create({
        lesson_id: lesson.id,
        teacher_id: lesson.teacher_id,
        student_id: user.id,
        start_time,
        end_time,
        score: 0,
        comment: ''
      })

      req.flash('success_messages', `您已預約成功，上課時間：${startTime} ~ ${endTime}`)
      res.redirect(`/teachers/${lesson.id}`)
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = teacherController