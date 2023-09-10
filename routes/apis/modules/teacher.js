const express = require('express')
const upload = require('../../../middleware/multer')
const teacherController = require('../../../controller/apis/teacher-controller')

const router = express.Router()

router.get('/create', teacherController.createNewTeacher)
router.post('/create', teacherController.postNewTeacher)
router.get('/:id/personal', teacherController.getTeacher)
router.get('/:id/edit', teacherController.editTeacher)
router.post('/:id/reserve', teacherController.postReserve)
router.put('/:id/score', teacherController.putScore)
router.get('/:id', teacherController.getLesson)
router.put('/:id', upload.single('img'), teacherController.putTeacher)


module.exports = router