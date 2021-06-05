const mongoose = require('mongoose')

const Category = require('../category')
const CategoryData = require('../../category.json')

mongoose.connect('mongodb://localhost/expense-tracker', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
      Category.insertMany(CategoryData)
        .then(() => {
          console.log('insert categorySeeder done')
          return db.close()
        })
        .then(() => {
          console.log('The database connection to the record seeder has been closed!')  
        })
})


