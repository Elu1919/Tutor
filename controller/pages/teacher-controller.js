const moment = require('moment')
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { Lesson, User, ClassRecord } = require('../../models')
const weekDay = [
  { id: '1', date: '星期日' },
  { id: '2', date: '星期一' },
  { id: '3', date: '星期二' },
  { id: '4', date: '星期三' },
  { id: '5', date: '星期四' },
  { id: '6', date: '星期五' },
  { id: '7', date: '星期六' },
]

const teacherController = {
  getTeacher: async (req, res, next) => {
    const lesson = await Lesson.findAll({
      where: {
        teacher_id: req.params.id
      },
      raw: true
    })
    const records = await ClassRecord.findAll({
      where: {
        lesson_id: lesson[0].id
      },
      order: [
        ['start_time', 'ASC']
      ],
      include: [
        { model: User, as: 'classStudent' }
      ],
      nest: true,
      raw: true
    })
    lesson[0].averageScore = lesson.total_score / lesson.score_count
    const recordData = records.map(record => ({
      ...record,
      date: {
        now: parseInt(moment(new Date()).format("YYYYMMDDHHmmss")),
        end: parseInt(moment(record.end_time).format("YYYYMMDDHHmmss"))
      },
      start_time: moment(record.start_time).format("YYYY-MM-DD HH:mm"),
      end_time: moment(record.end_time).format("HH:mm | dddd"),
      updated_at: moment(record.updated_at).format("[comment at] YYYY-MM-DD")
    }))
    res.render('teacher', { lesson: lesson[0], records: recordData })
  },
  editTeacher: async (req, res, next) => {
    const lesson = await Lesson.findAll({
      where: {
        teacher_id: req.params.id
      },
      raw: true
    })
    const date = Array.from(lesson[0].date)
    res.render('teacher-edit', {
      lesson: lesson[0],
      weekDay,
      date
    })
  },
  putTeacher: (req, res, next) => {
    const { name, info, style, time, link, date } = req.body
    const { file } = req
    if (!date) throw new Error('請選擇 開放時間 !!')
    Promise.all([
      Lesson.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([lesson, filePath]) => {
        if (!lesson) throw new Error("Lesson didn't exist!")
        return lesson.update({
          name,
          info,
          style,
          time,
          link,
          date: date.toString().replaceAll(',', ''),
          img: filePath || lesson.img
        })
      })
      .then(() => {
        req.flash('success_messages', '資訊修改成功！')
        res.redirect(`/teachers/${req.params.id}/personal`)
      })
      .catch(err => next(err))
  },
  createNewTeacher: (req, res, next) => {
    const user = req.user
    if (user.is_teacher) throw new Error("您已經是老師了！")
    res.render('new-teacher', { weekDay })
  },
  postNewTeacher: async (req, res, next) => {
    const { info, style, time, link, date } = req.body
    const user = req.user

    if (!date) throw new Error('請選擇 開放時間 !!')
    if (time === '請選擇時間') throw new Error('請選擇 單堂課時間 !!')

    await Lesson.create({
      teacher_id: user.id,
      name: user.name,
      info,
      style,
      time,
      link,
      date: date.toString().replaceAll(',', ''),
      img: user.avatar,
      total_score: 0,
      score_count: 0,
    })
      .then(async () => {
        const student = await User.findByPk(user.id)
        if (!student) throw new Error("User didn't exist!")
        return await student.update({
          is_teacher: true
        })
      })
      .then(() => {
        req.flash('success_messages', '您已成為老師！')
        res.redirect(`/teachers/${user.id}/personal`)
      })
      .catch(err => next(err))
  },
  getLesson: async (req, res, next) => {
    const lesson = await Lesson.findByPk(req.params.id, {
      raw: true
    })
    const records = await ClassRecord.findAll({
      where: {
        lesson_id: req.params.id
      },
      order: [
        ['start_time', 'ASC']
      ],
      nest: true,
      raw: true
    })
    lesson.averageScore = lesson.total_score / lesson.score_count
    const recordData = records.map(record => ({
      ...record,
      date: {
        now: parseInt(moment(new Date()).format("YYYYMMDDHHmmss")),
        end: parseInt(moment(record.end_time).format("YYYYMMDDHHmmss"))
      },
      start_time: moment(record.start_time).format("YYYY-MM-DD HH:mm"),
      end_time: moment(record.end_time).format("HH:mm | dddd"),
      updated_at: moment(record.updated_at).format("[comment at] YYYY-MM-DD")
    }))
    res.render('lesson', { lesson, records: recordData })
  },
  postReserve: (req, res, next) => {

  }
}

module.exports = teacherController