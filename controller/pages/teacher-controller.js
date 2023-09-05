const teacherController = {
  getTeacher: (req, res, next) => {
    res.render('teacher')
  },
  editTeacher: (req, res, next) => {
    res.render('teacher-edit')
  },
  putTeacher: (req, res, next) => {

  },
  createNewTeacher: (req, res, next) => {
    res.render('new-teacher')
  },
  postNewTeacher: (req, res, next) => {

  },
  getLesson: (req, res, next) => {
    res.render('lesson')
  },
  postReserve: (req, res, next) => {

  }
}

module.exports = teacherController