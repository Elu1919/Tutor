const express = require('express')
const upload = require('../../../middleware/multer')
const { authenticatedTeacher } = require('../../../middleware/api-auth')
const teacherController = require('../../../controller/apis/teacher-controller')

const router = express.Router()

router.get('/create', teacherController.createNewTeacher)
router.post('/create', teacherController.postNewTeacher)
router.get('/:id/personal', authenticatedTeacher, teacherController.getTeacher)
router.get('/:id/edit', authenticatedTeacher, teacherController.editTeacher)
router.post('/:id/reserve', teacherController.postReserve)
router.put('/:id/score', teacherController.putScore)
router.get('/:id', teacherController.getLesson)
router.put('/:id', authenticatedTeacher, upload.single('img'), teacherController.putTeacher)


module.exports = router