const express = require("express");
const router = express.Router();


const Category = require("../../models/category");
const Record = require("../../models/record");
const {
  getTotalAmount,
  getFormatDate,
  getCategoryBox,
} = require("../../tools/dataTools");

router.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((records) => {
      records.forEach((record) => {
        getFormatDate(record);
      });
      const totalAmount = getTotalAmount(records);
      Category.find()
        .lean()
        .then((categories) => {
          const categoryBox = getCategoryBox(categories);
          res.render("index", {
            records: records,
            totalAmount: totalAmount,
            categoryBox: categoryBox,
          });
        });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
