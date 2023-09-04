const express = require('express')
const homeController = require('../../../controller/pages/home-controller')

const router = express.Router()

router.get('/', homeController.gethome)
router.post('/search', homeController.search)

module.exports = router