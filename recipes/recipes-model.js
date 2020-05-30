const db = require("../data/dbConfig");

module.exports = {
  find,
  findBy,
  addRecipe,
  findRecipeById,
  addIngredient,
  findIngredientsById,
  addInstruction,
  findInstructionById,
  remove,
};

function find() {
  return db("recipes").select("user_id", "email", "username", "password");
}

function findBy(filter) {
  return db("recipes").where(filter);
}

// *** Recipes ***

async function addRecipe(recipe) {
  const [user_id] = await db("recipes").insert(recipe).returning("user_id");

  return findRecipeById(user_id);
}

function findRecipeById(user_id) {
  return db("recipes").where({ user_id }, req.params.id).first();
}

// // *** Ingredients ***

// async function addIngredient(ingredient) {
//   const [recipe_id] = await db("ingredients")
//     .insert(ingredient)
//     .returning("recipe_id");

//   return findIngredientsById(recipe_id);
// }

// function findIngredientsById(recipe_id) {
//   return db("ingredients")
//     .where({ recipe_id })
//     .select("user_id", "ingr_id", "ingr_name", "amount", "recipe_id")
//     .first();
// }

// // *** Instructions ***

// async function addInstruction(instruction) {
//   const [recipe_id] = await db("instructions")
//     .insert(instruction)
//     .returning("recipe_id");

//   return findInstructionById(recipe_id);
// }

// function findInstructionById(instr_id) {
//   return db("instructions")
//     .where({ recipe_id })
//     .select("user_id", "instr_id", "step_#", "instruction", "recipe_id")
//     .first();
// }

function remove(recipe_id) {
  return db("recipes").where({ user_id }).del();
}
