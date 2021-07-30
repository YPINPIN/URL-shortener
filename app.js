// Express
const express = require('express')
const exphbs = require('express-handlebars')
// server port
const port = 3000

// routes
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// body-parser
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})