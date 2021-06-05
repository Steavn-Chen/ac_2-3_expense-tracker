const Record = require('../record')
const recordData = require('../../record.json')

const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
    const records = recordData.map(record => ({
      name : record.name, 
      date: record.date,
      category: record.category, 
      amount: record.amount, 
      categoryIcon: record.categoryIcon
    }))
      Record.insertMany(records)
        .then(() => {
          return db.close()
        })
     console.log('insert recordSeeder done.')
})
