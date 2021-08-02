// Express & Router
const express = require('express')
const router = express.Router()
// urlHelpers
const urlHelpers = require('../../tools/urlHelpers')
// BASE_URL Heroku : process.env.BASE_URL ; Local : http://localhost:3000
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
// URL Schema
const URL = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

// 收到短網址請求
router.post('/', async (req, res) => {
  const originalUrl = req.body.originalUrl.trim()
  // 驗證URL
  const isValidation = urlHelpers.isValidation(originalUrl)
  if (isValidation) {
    // 檢查是否有對應的短網址
    const url = await URL.findOne({ originalUrl }).lean()
    if (url) {
      return res.render('index', { isValidation, originalUrl, shortUrl: url.shortUrl })
    }

    // 產生urlCode
    let urlCode = ''
    let existUrl = null
    do {
      urlCode = urlHelpers.randomUrlCode()
      // 檢查資料庫是否已有此urlCode
      existUrl = await URL.findOne({ urlCode }).lean()
    } while (existUrl)

    // 短網址資料存入資料庫
    const shortUrl = `${BASE_URL}/${urlCode}`
    URL.create({
      originalUrl,
      urlCode,
      shortUrl
    })
      .then(() => {
        res.render('index', { isValidation, originalUrl, shortUrl })
      })
      .catch((error) => console.error(error))
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