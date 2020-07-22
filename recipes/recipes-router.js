const express = require("express");
const db = require("../data/dbConfig");
const Recipes = require("./recipes-model");

const router = express.Router();

// *** GET Recipes ***

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

// *** GET Ingredients ***
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

// *** GET Instructions

router.get("/instructions", async (req, res, next) => {
  try {
    res.json(await db("instructions"));
  } catch (err) {
    next(err);
  }
});

// *** GET Recipes by Recipe iD ****

router.get("/:id", async (req, res, next) => {
  try {
    const recipes = await db("recipes as r")
      .where("recipe_id", req.params.id)
      .select(
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

// *** GET Ingredients By Recipe iD ***

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

// *** GET Instructions BY Recipe iD ***
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

  await Recipes.addRecipe(newRecipe)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new recipe" });
    });
});

// *** ADD Ingredients ***

router.post("/:id/ingredients", async (req, res) => {
  try {
    const newIngredient = req.body;

    const ingredients = await db("ingredients")
      .insert(newIngredient)
      .where("recipe_id", req.params.id);
    res.status(201).json(ingredients);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "New ingredient could not be added",
    });
  }
});

// *** ADD Instructions***

router.post("/:id/instructions", async (req, res) => {
  try {
    const newInstruction = req.body;

    const instructions = await db("instructions")
      .insert(newInstructiont)
      .where("recipe_id", req.params.id);
    res.status(201).json(instructions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "New instruction could not be added",
    });
  }
});

module.exports = router;
