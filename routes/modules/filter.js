const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");

const Record = require("../../models/record");
const Category = require("../../models/category.js");
const {
  getTotalAmount,
  getFormatDate,
  getCategoryBox,
} = require("../../tools/dataTools");

router.get("/", (req, res) => {
  const query = req.query.category;
  Handlebars.registerHelper("ifEq", function (a,options) {
    if (a == query) {  
      return options.fn(this);
    } else {   
      return options.inverse(this);
    }
  });
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
          });
        });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
