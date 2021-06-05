const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const moment = require('moment')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()

require('./config/mongoose')

app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static('public'))
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})