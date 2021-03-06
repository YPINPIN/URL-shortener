// Express
const express = require('express')
const exphbs = require('express-handlebars')
// server port Heroku : process.env.PORT ; Local : 3000
const port = process.env.PORT || 3000

// routes
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// body-parser
app.use(express.urlencoded({ extended: true }))
// static files
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})