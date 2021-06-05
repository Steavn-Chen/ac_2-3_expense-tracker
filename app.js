const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')
const Handlebars = require('handlebars')
const methodOverride = require('method-override')
const { getTotalAmount, getFormatDate } = require('./public/function')

const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', {useNewUrlParser: true, useUnifiedTopology: true})

const categoryBox = require('./category.json')
const Record = require('./models/record')
const Category = require('./models/category.js')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
} )

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.get('/', (req, res) => {
  Handlebars.registerHelper('ifEq', function (a,options) {
    if(a) return
    if (a == '所有類別') { return options.fn(this) }
      else return options.inverse(this);
  })
  Record.find()
  .lean()
  .then(records => { records.forEach(record => {
    getFormatDate(record)})
    const totalAmount = getTotalAmount(records)
      res.render('index', { records: records,totalAmount: totalAmount,categoryBox:categoryBox }) 
  }) 
  .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
  res.render('new', { categoryBox: categoryBox })
})

app.post('/', (req, res) => {
  const { name, date, category, amount} = req.body
    Category.find()
      .lean()
      .then(categories =>  categories.find(item => category === item.category ))
      .then(iconData => {
        Record.create ({
          name : name,
          date : date,
          category : category,
          amount : amount,
          categoryIcon : iconData.categoryIcon
        })
      })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/filter', (req, res) => {
  const query = req.query.category
  Handlebars.registerHelper('ifEq', function (a, options) {
    if (a == query) { 
      return options.fn(this) }
      else  return options.inverse(this);
  })
  
  Record.find()
    .lean()
    .then(records => { 
      let filterRecord = records.filter(record => 
        record.category.toLowerCase().includes(query))
      if (!filterRecord.length) {
        filterRecord = records
      }
      filterRecord.forEach(record => {
      getFormatDate(record)
      })
      const totalAmount = getTotalAmount(filterRecord)
      res.render('index', {records: filterRecord,totalAmount: totalAmount,categoryBox:categoryBox })
    })
    .catch(error => console.log(error))
})

app.get('/records/:record_id/edit', (req, res) => {
  const id = req.params.record_id
  return Record.findById(id)
  .lean()
  .then(record => { 
    Handlebars.registerHelper('ifEq', function (a, options) {
    if (a == record.category) { 
      return options.fn(this) }
    else return options.inverse(this)
    })
    record.date = getFormatDate(record.date)
    res.render('edit', { record, categoryBox })
  }) 
  .catch(error => console.log(error)) 
})

app.post('/records/:record_id', (req,res) => {
  const id = req.params.record_id
  const { name, date, category, amount } = req.body
  const body = req.body
  return Record.findById(id)
    .then(record => {
      Category.find()
        .lean()
        .then(categories => categories.find(data => category === data.category))
        .then(iconDta =>  {
          let newRecord = Object.assign(record, body)
          newRecord.categoryIcon = iconDta.categoryIcon
          return newRecord.save()
        })
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

app.post('/records/:record_id/delete', (req, res) => {
  const id = req.params.record_id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})