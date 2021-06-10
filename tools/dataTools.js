const moment = require("moment");
function getTotalAmount(records) {
  let totalAmount = 0;
  records.forEach((record) => {
    totalAmount += record.amount;
  });
  return totalAmount;
}

function getFormatDate(record) {
  return (record.date = moment(record.date).format("YYYY-MM-DD"));
}

function getCategoryBox(iconData) {
  const categoryBox = [];
  iconData.forEach((category) => categoryBox.push(category));
  return categoryBox;
}

function getCategoryName(categoryData, category) {
  const iconName = categoryData.find((item) => category === item.category);
  return iconName;
}

module.exports = {
  getTotalAmount,
  getFormatDate,
  getCategoryBox,
  getCategoryName,
};
