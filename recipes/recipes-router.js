const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const recipes = await db("recipes");
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve users",
    });
  }
});

router.get("/instructions", async (req, res) => {
  try {
    const recipes = await db("instructions as i")
      .join("recipes as r", "i.recipe_id", "r.recipe_id")
      .join("ingredients as ig", "ig.id", "i.id")

      .select(
        "i.recipe_id",
        "r.name",
        "r.prepTime",
        "r.type",
        "ig.ingr_name",
        "ig.amount",
        "step #",
        "instruction",
        "r.source"
      );
  } catch (err) {
    console.log(err);
    next(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve instructions",
    });
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
