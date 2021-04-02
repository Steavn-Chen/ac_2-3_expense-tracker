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
          console.log('insert categoryseeder done')
          return db.close()
        })
        .then(() => {
          console.log('The database connection to the gategory seeder has been closed!')  
        })
    // for (let i = 0; i < recordData.length ; i++) {
      //   Record.create({ 
        //     name : recordData[i].name, 
        //     date: recordData[i].date , 
  //     category: recordData[i].category, 
  //     amount: recordData[i].amount , 
  //     // categoryIcon: RecordData[i].categoryIcon
  //     categoryIcon: " "
  //   }) 
  // }
  // RecordData.forEach(record => {
    // Record.create(record)
    //  console.log('done')  
})
