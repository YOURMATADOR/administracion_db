const express = require('express')
const router = express.Router()

const index_controller = require('../controllers/index')

router.get('/home',index_controller.getIndex)

module.exports = router