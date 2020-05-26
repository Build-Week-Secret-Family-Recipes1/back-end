exports.seed = function (knex) {
  return knex("ingredients").insert([
    { ingr_name: "bread slices", amount: 2.0 },
    { ingr_name: "sliced cheese", amount: 1.0 },
    { ingr_name: "butter (tsp)", amount: 1.0 },
  ]);
};
