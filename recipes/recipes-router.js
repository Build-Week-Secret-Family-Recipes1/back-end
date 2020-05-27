const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await db("recipes"));
  } catch (err) {
    next(err);
  }
});

// router.get("/users", async (req, res, next) => {
//   try {
//     res.json(await db("users"));
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
