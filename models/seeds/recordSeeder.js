const mongoose = require('mongoose')

const Record = require('../record')
const recordData = require('../../record.json')

mongoose.connect('mongodb://localhost/expense-tracker', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
    const records = recordData.map(record => ({
      name : record.name, 
      date: record.date,
      category: record.category, 
      amount: record.amount, 
      categoryIcon: record.categoryIcon
    }))
      Record.insertMany(records)
        .then(() => {
          console.log('insert recordSeeder done')
          return db.close()
        })
        .then(() => {
          console.log('The database connection to the category seeder has been closed!')  
        })
})
