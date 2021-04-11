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
          console.log('insert recordseeder done')
          return db.close()
        })
        .then(() => {
          console.log('The database connection to the record seeder has been closed!')  
        })
        // map返回新陣列
   // const categorys = CategoryData.forEach(category)
    //  const categorys = CategoryData.map(category => ({ 
    //   category: category.category,
    //   categoryIcon: category.categoryIcon
    // }))

  // for (let i = 0 ; i < recordData.length; i++ ) {
  //   Category.create ({
  //     category: recordData[i].category,
  //     categoryIcon: recordData[i].categoryIcon
  //   })
  // }
    // })
  // console.log('done')
})


