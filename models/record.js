const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recordSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)