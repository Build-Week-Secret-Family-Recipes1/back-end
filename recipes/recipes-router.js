const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const recipes = await db("instructions as i")
      .join("recipes as r", "i.recipe_id", "r.recipe_id")
      .join("category as c", "r.categoryId");
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await db("users");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve users",
    });
  }
});

module.exports = router;
