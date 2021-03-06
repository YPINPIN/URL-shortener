// mongoose
const mongoose = require('mongoose')
// Heroku : process.env.MONGODB_URI ; Local : mongodb://localhost
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/URL-shortener'

// 連線DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db