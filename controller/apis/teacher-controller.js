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
    teacherServices.postReserve(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = teacherController