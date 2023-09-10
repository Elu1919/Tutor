const express = require('express')
const upload = require('../../../middleware/multer')
const userController = require('../../../controller/apis/user-controller')

const router = express.Router()

router.get('/:id', userController.getUser)
router.put('/:id', upload.single('avatar'), userController.putUser)


module.exports = router