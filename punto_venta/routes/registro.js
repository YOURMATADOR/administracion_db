const express = require('express')
const router = express.Router()

const registro_login = require('../controllers/registro')

router.get('/registro',registro_login.getRegistro)
router.post('/registro',registro_login.postRegistro)

module.exports = router