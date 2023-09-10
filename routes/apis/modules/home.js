const express = require('express')
const homeController = require('../../../controller/apis/home-controller')

const router = express.Router()

router.get('/home', homeController.gethome)
router.get('/search', homeController.search)

module.exports = router