const express = require('express')
const userController = require('../../../controller/pages/user-controller')

const router = express.Router()

router.get('/:id', userController.getUser)
router.get('/:id/edit', userController.editUser)
router.put('/:id', userController.putUser)


module.exports = router