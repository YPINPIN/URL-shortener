// Express & Router
const express = require('express')
const router = express.Router()
// home
const home = require('./modules/home')

router.use('/', home)

module.exports = router