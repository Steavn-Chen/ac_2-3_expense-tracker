const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')

const Record = require('../../models/record')
const Category = require('../../models/category.js')
const categoryBox = require('../../category.json')
const { getTotalAmount, getFormatDate } = require('../../public/function')

router.get('/', (req, res) => {
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

module.exports = router