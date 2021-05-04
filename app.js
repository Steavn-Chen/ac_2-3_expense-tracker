const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')
const Handlebars = require('handlebars')
const { getTotalAmount, getFormatDate } = require('./public/function')

const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', {useNewUrlParser: true, useUnifiedTopology: true})

const Record = require('./models/record')
// const Category = require('./models/category')
const CategoryData = require('./category.json')
const Category = require('./models/category.js')


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
  // console.log(req)
  // console.log(Category)
  // let totalAmount = 0
  const query = req.query.category
  const categoryBox = []

  CategoryData.forEach(items => {
    categoryBox.push(items)
  })

 Handlebars.registerHelper('ifEq', function (a,options) {
    // if(a) return
    // if (a == '所有類別') { return options.fn(this) }
    //   else return options.inverse(this);
  })

  Record.find()
    .lean()
    .then(records => { records.forEach(record => {
      //  record.date = moment(record.date).format('YYYY-MM-DD')
       getFormatDate(record)
      //  totalAmount += Number(record.amount)
      //  record.categoryIcon = record({Category:categoryIcon})
      // console.log(Category)
       })
      const totalAmount = getTotalAmount(records)
        res.render('index', { records: records,totalAmount: totalAmount,categoryBox:categoryBox }) 
    }) 
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
  const categoryBox = []
    CategoryData.forEach(items => {
    categoryBox.push(items)
    }) 
  res.render('new', { categoryBox: categoryBox })
})

app.post('/', (req, res) => {
  const { name, date, category, amount} = req.body
    Category.find()
      .lean()
      .then(categories => { 
        const categoryIconItem = categories.find(item => {
          return category === item.category
        })
        return categoryIconItem.categoryIcon
      })
      .then(categoryIcon => 
        Record.create ({
          name : name,
          date : date,
          category : category,
          amount : amount,
          categoryIcon : categoryIcon
        })
      )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/filter', (req, res) => {
  const categoryBox = []
  const query = req.query.category
    CategoryData.forEach(items => {
    categoryBox.push(items)
  }) 

  Handlebars.registerHelper('ifEq', function (a, options) {
    if (a == query) { return options.fn(this) }
      else return options.inverse(this);
  });
  
  // Handlebars.registerHelper('ifnoteq', function (a, options) {
  //     if (a != query) {  return options.fn(this) }
  //     // return options.inverse(this);
  // });

  Record.find()
    .lean()
    .then(records => { 
      const filterRecord = records.filter(record => {
      return record.category.toLowerCase().includes(query)
    })
    filterRecord.forEach(record => {
      //  record.date = moment(record.date).format('YYYY-MM-DD')
      getFormatDate(record)
      //  totalAmount += Number(record.amount)
    })
    const totalAmount = getTotalAmount(filterRecord)
      res.render('index', {records: filterRecord,totalAmount: totalAmount,categoryBox:categoryBox })
    })
  .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})