const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

const Record = require('../../models/record')
const categoryBox = require('../../category.json')
const { getTotalAmount, getFormatDate } = require('../../public/function')

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
      res.render('index', { records: records,totalAmount: totalAmount,categoryBox:categoryBox }) 
  }) 
  .catch(error => console.log(error))
})

module.exports = router