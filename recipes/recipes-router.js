const express = require("express");
const db = require("../data/dbConfig");
const Users = require("./recipes-model");

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

// *** ADD Recipe ***

router.post("/", async (req, res) => {
  const newRecipe = req.body;

  await Users.addRecipe(newRecipe)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new recipe" });
    });
});

// *** ADD Ingredients ***

router.post("/ingredients", async (req, res) => {
  const newIngredient = req.body;

  await Users.addIngredient(newIngredient)
    .then((ingredient) => {
      res.status(201).json(ingredient);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new ingredient" });
    });
});

module.exports = router;
