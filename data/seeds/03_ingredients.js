exports.seed = function (knex) {
  return knex("ingredients").insert([
    {
      username: "test_user",
      ingr_name: "bread slices",
      amount: 2.0,
      recipe_id: 1,
    },
    {
      username: "test_user",
      ingr_name: "sliced cheese",
      amount: 1.0,
      recipe_id: 1,
    },
    {
      username: "test_user",
      ingr_name: "butter (tsp)",
      amount: 1.0,
      recipe_id: 1,
    },
  ]);
};
