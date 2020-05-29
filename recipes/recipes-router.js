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

router.get("/ingredients", async (req, res, next) => {
  try {
    const ingredients = await db("ingredients");
    res.json(ingredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve ingredients",
    });
  }
});

router.get("/:id/ingredients", async (req, res, next) => {
  try {
    const ingredients = await db("ingredients").where(
      "recipe_id",
      req.params.id
    );
    if (!ingredients) {
      return res.status(404).json({
        message: "Ingredients not found",
      });
    }
    res.json(ingredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve ingredients",
    });
  }
});

router.get("/instructions", async (req, res, next) => {
  try {
    res.json(await db("instructions"));
  } catch (err) {
    next(err);
  }
});

router.get("/:id/instructions", async (req, res, next) => {
  try {
    const instructions = await db("instructions").where(
      "recipe_id",
      req.params.id
    );
    if (!instructions) {
      return res.status(404).json({
        message: "Instructions not found",
      });
    }
    res.json(instructions);
  } catch (err) {
    console.log(err);
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
