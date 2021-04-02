const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', {useNewUrlParser: true, useUnifiedTopology: true})

const Record = require('./models/record')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
} )

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('handlebars',exphbs({ defaultLayout: 'main'}) )
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records: records}))
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
   res.render('new')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})