const { Lesson, User } = require('../../models')
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
      nest: true,
      raw: true
    })
    const score = lesson[0].total_score
    const count = lesson[0].score_count
    const data = lesson.map(lesson => ({
      ...lesson,
      averageScore: score / count
    }))
    console.log(data)

    res.render('teacher', { lesson: data[0] })
  },
  editTeacher: async (req, res, next) => {
    const lesson = await Lesson.findByPk(req.params.id, { raw: true })
    const date = Array.from(lesson.date)
    res.render('teacher-edit', {
      lesson,
      weekDay,
      date
    })
  },
  putTeacher: (req, res, next) => {

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
  getLesson: (req, res, next) => {
    res.render('lesson')
  },
  postReserve: (req, res, next) => {

  }
}

module.exports = teacherController