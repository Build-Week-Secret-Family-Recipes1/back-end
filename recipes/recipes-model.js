const db = require("../data/dbConfig");

module.exports = {
  find,
  findBy,
  addRecipe,
  findRecipeById,
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

function remove(recipe_id) {
  return db("recipes").where({ user_id }).del();
}
