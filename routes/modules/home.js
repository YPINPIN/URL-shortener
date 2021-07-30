// Express & Router
const express = require('express')
const router = express.Router()
// urlHelpers
const urlHelpers = require('../../tools/urlHelpers')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl.trim()
  const isValidation = urlHelpers.isValidation(originalUrl)
  const urlCode = urlHelpers.randomUrlCode()
  console.log('originalUrl', originalUrl)
  console.log('isValidation : ', isValidation)
  console.log('urlCode : ', urlCode)
  res.render('index', { originalUrl })
})

module.exports = router