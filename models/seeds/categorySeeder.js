const mongoose = require('mongoose')

const Category = require('../category')
const recordData = require('../../record.json')

mongoose.connect('mongodb://localhost/expense-tracker', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
    const categorys = recordData.map(record => ({ 
      category: record.category,
      categoryIcon: record.categoryIcon
    }))
      Category.insertMany(categorys)
        .then(() => {
          console.log('insert recordseeder done')
          return db.close()
        })
        .then(() => {
          console.log('The database connection to the record seeder has been closed!')  
        })
  // for (let i = 0 ; i < recordData.length; i++ ) {
  //   Category.create ({
  //     category: recordData[i].category,
  //     categoryIcon: recordData[i].categoryIcon
  //   })
  // }
    // })
  // console.log('done')
})


