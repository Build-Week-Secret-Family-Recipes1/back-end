exports.seed = function (knex) {
  return knex("interTable").insert([
    { recipe_id: 1, ingr_id: 1 },
    { recipe_id: 1, ingr_id: 2 },
    { recipe_id: 1, ingr_id: 3 },
  ]);
};
