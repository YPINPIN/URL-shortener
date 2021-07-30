// Express & Router
const express = require('express')
const router = express.Router()

router.get('/', (ree, res) => {
  res.render('index')
})

module.exports = router