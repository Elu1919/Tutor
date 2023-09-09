const express = require('express')
const { authenticatedTeacher } = require('../../../middleware/auth')
const upload = require('../../../middleware/multer')
const teacherController = require('../../../controller/pages/teacher-controller')

const router = express.Router()

router.get('/create', teacherController.createNewTeacher)
router.post('/create', teacherController.postNewTeacher)
router.post('/reserve', teacherController.postReserve)
router.get('/:id/personal', authenticatedTeacher, teacherController.getTeacher)
router.get('/:id/edit', authenticatedTeacher, teacherController.editTeacher)
router.put('/:id/score', teacherController.putScore)
router.get('/:id', teacherController.getLesson)
router.put('/:id', upload.single('img'), authenticatedTeacher, teacherController.putTeacher)


module.exports = router