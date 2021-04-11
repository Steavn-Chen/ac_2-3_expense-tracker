const moment = require('moment')

function getTotalAmount(records) {
  let totalAmount = 0
  records.forEach(record => {
    totalAmount += record.amount
  })
  return totalAmount
}

function getFormatDate(record) {
  return record.date = moment(record.date).format('YYYY-MM-DD')
}

module.exports = { getTotalAmount, getFormatDate }
