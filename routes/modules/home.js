const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

const Category = require('../../models/category')
const Record = require('../../models/record')
const { getTotalAmount, getFormatDate, getCategoryBox } = require('../../public/function')

router.get('/', (req, res) => {
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
    Category.find()
    .lean()
    .then(categories => { 
      const categoryBox = getCategoryBox(categories)
      res.render('index', { records: records,totalAmount: totalAmount,categoryBox:categoryBox }) 
    })
  }) 
  .catch(error => console.log(error))
})

module.exports = router