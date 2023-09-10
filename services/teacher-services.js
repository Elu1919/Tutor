const moment = require('moment')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { Lesson, User, ClassRecord } = require('../models')
const weekDay = [
  { id: '1', date: '星期日', en: 'Sun' },
  { id: '2', date: '星期一', en: 'Mon' },
  { id: '3', date: '星期二', en: 'Tue' },
  { id: '4', date: '星期三', en: 'Wed' },
  { id: '5', date: '星期四', en: 'Thu' },
  { id: '6', date: '星期五', en: 'Fri' },
  { id: '7', date: '星期六', en: 'Sat' },
]

const teacherServices = {
  getTeacher: async (req, cb) => {
    try {
      const lesson = await Lesson.findAll({
        where: {
          teacher_id: req.params.id
        },
        raw: true
      })
      if (!lesson[0]) {
        const err = new Error("this teacher didn't exist!")
        err.status = 404
        throw err
      }
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
      lesson[0].averageScore = (lesson[0].total_score / lesson[0].score_count).toFixed(1)
      const recordData = records.map(record => ({
        ...record,
        date: {
          now: parseInt(moment(new Date()).format("YYYYMMDDHHmmss")),
          end: parseInt(moment(record.end_time).format("YYYYMMDDHHmmss"))
        },
        start_time: moment(record.start_time).format("YYYY-MM-DD HH:mm"),
        end_time: moment(record.end_time).format("HH:mm | dddd"),
      }))
      return cb(null, { lesson: lesson[0], records: recordData })
    }
    catch (err) {
      cb(err)
    }
  },
  editTeacher: async (req, cb) => {
    try {
      const lesson = await Lesson.findAll({
        where: {
          teacher_id: req.params.id
        },
        raw: true
      })
      if (!lesson[0]) {
        const err = new Error("this lessen didn't exist!")
        err.status = 404
        throw err
      }
      const date = Array.from(lesson[0].date)
      return cb(null, {
        lesson: lesson[0],
        weekDay,
        date
      })
    }
    catch (err) {
      cb(err)
    }
  },
  putTeacher: (req, cb) => {
    const { name, info, style, time, link, date } = req.body
    const { file } = req
    if (!date) throw new Error('請選擇 開放時間 !!')
    Promise.all([
      Lesson.findAll({
        where: {
          teacher_id: req.params.id
        }
      }),
      imgurFileHandler(file)
    ])
      .then(([lesson, filePath]) => {
        if (!lesson[0]) throw new Error("Lesson didn't exist!")
        return lesson[0].update({
          name,
          info,
          style,
          time,
          link,
          date: date.toString().replaceAll(',', ''),
          img: filePath || lesson[0].img
        })
      })
      .then(putLesson => {
        cb(null, { lesson: putLesson })
      })
      .catch(err => cb(err))
  },
  createNewTeacher: async (req, cb) => {
    try {
      return cb(null, { weekDay })
    }
    catch (err) {
      cb(err)
    }
  },
  postNewTeacher: async (req, cb) => {
    try {
      const { info, style, time, link, date } = req.body
      const user = req.user ? req.user : []

      if (!date) throw new Error('請選擇 開放時間 !!')

      const newTeacher = await Lesson.create({
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

      const student = await User.findByPk(user.id)
      if (!student) {
        const err = new Error("user didn't exist!")
        err.status = 404
        throw err
      }
      await student.update({
        is_teacher: true
      })

      return cb(null, { teacher: newTeacher })
    }
    catch (err) {
      cb(err)
    }
  },
  getLesson: async (req, cb) => {
    try {
      const lesson = await Lesson.findByPk(req.params.id, {
        raw: true
      })
      if (!lesson) {
        const err = new Error("this lessen didn't exist!")
        err.status = 404
        throw err
      }
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

      lesson.averageScore = (lesson.total_score / lesson.score_count).toFixed(1)

      const recordData = records.map(record => ({
        ...record,
        date: {
          now: parseInt(moment(new Date()).format("YYYYMMDDHHmmss")),
          end: parseInt(moment(record.end_time).format("YYYYMMDDHHmmss"))
        },
        start_time: moment(record.start_time).format("YYYY-MM-DD HH:mm"),
        end_time: moment(record.end_time).format("HH:mm | dddd"),
      }))

      // reserve
      const reserves = []
      const week = lesson.date.split('')
      let now = moment(new Date()).format("YYYY,MM,DD,HH,mm").split(',')
      now = now.map(d => parseInt(d))
      for (let i = 0; i < 14; i++) {
        const reserveDay = new Date(now[0], now[1] - 1, now[2] + i)
        for (let w = 0; w < week.length; w++) {
          const reserveWeek = moment(new Date(reserveDay)).format("ddd")
          if (reserveWeek.includes(weekDay[week[w] - 1].en)) {
            for (let t = 0; t < 240; t += lesson.time) {
              const reserveDate = new Date(now[0], now[1] - 1, now[2] + i, 18, t)
              let check = 0
              await records.map(record => {
                const recordTime = moment(record.start_time).format("YYYYMMDDHHmm")
                const reserveTime = moment(reserveDate).format("YYYYMMDDHHmm")
                if (recordTime === reserveTime) check = 1
              })
              if (check === 0) {
                const endTime = new Date(now[0], now[1] - 1, now[2] + i, 18, t + lesson.time)
                const date = {
                  startTime: moment(reserveDate).format("MM/DD HH:mm"),
                  endTime: moment(endTime).format("HH:mm | ddd"),
                  value: moment(reserveDate).format("YYYY,MM,DD,HH,mm")
                }
                reserves.push(date)
              }
            }
          }
        }
      }
      return cb(null, { lesson, records: recordData, reserves })
    }
    catch (err) {
      cb(err)
    }
  },
  putScore: async (req, cb) => {
    try {
      const { score, comment } = req.body
      const record = await ClassRecord.findByPk(req.params.id)
      const lesson = await Lesson.findByPk(record.lesson_id)
      if (!record) throw new Error("classRecord didn't exist!")
      await record.update({
        score,
        comment
      })
      const putData = await lesson.update({
        total_score: parseInt(lesson.total_score) + parseInt(score),
        score_count: lesson.score_count + 1
      })
      return cb(null, { data: putData })
    }
    catch (err) {
      cb(err)
    }
  },
  postReserve: async (req, cb) => {
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

      const postData = await ClassRecord.create({
        lesson_id: lesson.id,
        teacher_id: lesson.teacher_id,
        student_id: user.id,
        start_time,
        end_time,
        score: 0,
        comment: ''
      })

      return cb(null, { date: postData, startTime, endTime, lessonId: lesson.id })
    }
    catch (err) {
      cb(err)
    }
  }
}

module.exports = teacherServices