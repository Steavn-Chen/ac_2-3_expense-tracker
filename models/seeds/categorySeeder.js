const Category = require('../category')
const CategoryData = require('../../category.json')
require('../../config/mongoose')

const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Category.insertMany(CategoryData)
  .then(() => {
    return db.close()
  })
   console.log('insert categorySeeder done.')
})


