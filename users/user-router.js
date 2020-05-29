const express = require("express");
const db = require("../data/dbConfig");
const Users = require("./user-model");

const router = express.Router();

// *** GET Users ***

router.get("/", async (req, res) => {
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

// *** GET Users by ID ***

router.get("/:id", async (req, res) => {
  try {
    const user = await db("users").where("user_id", req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve user",
    });
  }
});

// *** GET Recipes by User ID ****

router.get("/:id/recipes", async (req, res, next) => {
  try {
    const recipes = await db("recipes as r")
      .join("users as u", "u.user_id", "r.user_id")
      .where("u.user_id", req.params.id)
      .select(
        "u.username",
        "r.recipe_id",
        "r.name",
        "r.prep_time",
        "r.category",
        "r.source",
        "r.img_path"
      );
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not retrieve user recipes",
    });
    next(err);
  }
});

// *** GET Ingredients by User ID ***

router.get("/:id/ingredients", async (req, res, next) => {
  try {
    const ingredients = await db("ingredients as i")
      .join("users as u", "u.user_id", "i.user_id")
      .where("u.user_id", req.params.id)
      .select(
        "u.username",
        "i.ingr_id",
        "i.ingr_name",
        "i.amount",
        "i.recipe_id"
      );
    res.json(ingredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not retrieve user ingredients",
    });
    next(err);
  }
});

// *** GET Instructions by User ID ***

router.get("/:id/instructions", async (req, res, next) => {
  try {
    const instructions = await db("instructions as i")
      .join("users as u", "u.user_id", "i.user_id")
      .where("u.user_id", req.params.id)
      .select(
        "u.username",
        "i.instr_id",
        "i.step_#",
        "i.instruction",
        "i.recipe_id"
      );
    res.json(instructions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not retrieve user instructions",
    });
    next(err);
  }
});

module.exports = router;
