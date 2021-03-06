const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category.js");
const {
  getFormatDate,
  getCategoryBox,
  getCategoryName,
} = require("../../tools/dataTools");

router.get("/new", (req, res) => {
  Category.find()
    .lean()
    .then((categories) => {
      const categoryBox = getCategoryBox(categories);
      res.render("new", { categoryBox: categoryBox });
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { name, date, category, amount } = req.body;
  Category.find()
    .lean()
    .then((categories) => getCategoryName(categories, category))
    .then((iconData) => {
      Record.create({
        name: name,
        date: date,
        category: category,
        amount: amount,
        categoryIcon: iconData.categoryIcon,
      });
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.get("/:record_id/edit", (req, res) => {
  const id = req.params.record_id;
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = getFormatDate(record.date);
      Category.find()
        .lean()
        .then((categories) => {
          const categoryBox = getCategoryBox(categories);
          res.render("edit", { record: record, categoryBox: categoryBox });
        });
    })
    .catch((error) => console.log(error));
});

router.put("/:record_id", (req, res) => {
  const id = req.params.record_id;
  const category = req.body.category;
  const body = req.body;
  return Record.findById(id)
    .then((record) => {
      Category.find()
        .lean()
        .then((categories) => getCategoryName(categories, category))
        .then((iconData) => {
          let newRecord = Object.assign(record, body);
          newRecord.categoryIcon = iconData.categoryIcon;
          return newRecord.save();
        });
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error));
});

router.delete("/:record_id", (req, res) => {
  const id = req.params.record_id;
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
