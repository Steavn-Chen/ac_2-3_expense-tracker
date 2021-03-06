const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category.js");
const {
  getTotalAmount,
  getFormatDate,
  getCategoryBox,
} = require("../../tools/dataTools");

router.get("/", (req, res) => {
  const query = req.query.category;

  Record.find()
    .lean()
    .then((records) => {
      Category.find()
        .lean()
        .then((categories) => {
          let filterRecord = records.filter((record) => 
             record.category.toLowerCase().includes(query)
          );
          if (
            categories.every((record) => {
              return query !== record.category;
            })
          ) {
            filterRecord = records;
          }
          filterRecord.forEach((record) => {
            getFormatDate(record);
          });
          const totalAmount = getTotalAmount(filterRecord);
          const categoryBox = getCategoryBox(categories);
          res.render("index", {
            records: filterRecord,
            totalAmount: totalAmount,
            categoryBox: categoryBox,
            categoryQuery: query
          });
        });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
