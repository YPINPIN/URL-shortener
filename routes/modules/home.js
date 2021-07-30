// Express & Router
const express = require('express')
const router = express.Router()
// urlHelpers
const urlHelpers = require('../../tools/urlHelpers')
// baseUrl
const baseUrl = 'http://localhost:3000'
// URL Schema
const URL = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

// 收到短網址請求
router.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl.trim()
  // 驗證URL
  const isValidation = urlHelpers.isValidation(originalUrl)
  if (isValidation) {
    const urlCode = urlHelpers.randomUrlCode()
    const shortUrl = `${baseUrl}/${urlCode}`
    URL.create({
      originalUrl,
      urlCode,
      shortUrl
    }).then(() => {
      res.render('index', { isValidation, originalUrl, shortUrl })
    }).catch((error) => console.error(error))
  } else {
    res.render('index', { isValidation, originalUrl })
  }
})

// 短網址跳轉
router.get('/:urlCode', (req, res) => {
  const urlCode = req.params.urlCode
  URL.findOne({ urlCode })
    .lean()
    .then((url) => {
      if (!url) {
        return res.status(404).render('error')
      }
      res.redirect(url.originalUrl)
    })
    .catch((error) => console.error(error))
})

module.exports = router