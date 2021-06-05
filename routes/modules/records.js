const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

const Record = require('../../models/record')
const Category = require('../../models/category.js')
const categoryBox = require('../../category.json')
const { getTotalAmount, getFormatDate } = require('../../public/function')

router.get('/new', (req, res) => {
  res.render('new', { categoryBox: categoryBox })
})

router.post('/', (req, res) => {
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

router.get('/:record_id/edit', (req, res) => {
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

router.put('/:record_id', (req,res) => {
  const id = req.params.record_id
  const { name, date, category, amount } = req.body
  const body = req.body
  return Record.findById(id)
    .then(record => {
      Category.find()
        .lean()
        .then(categories => categories.find(data => category === data.category))
        .then(iconData =>  {
          let newRecord = Object.assign(record, body)
          newRecord.categoryIcon = iconData.categoryIcon
          return newRecord.save()
        })
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:record_id', (req, res) => {
  const id = req.params.record_id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router