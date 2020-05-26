exports.seed = function (knex) {
  return knex("instructions").insert([
    { "step_#": 1, instruction: "Melt butter in warm pan", recipe_id: 1 },
    {
      "step_#": 2,
      instruction:
        "Place cheese on one slice of bread and toast until cheese melts",
      recipe_id: 1,
    },
    {
      "step_#": 3,
      instruction: "Place remaining bread slice on top",
      recipe_id: 1,
    },
    {
      "step_#": 4,
      instruction:
        "Flip sandwich and cook until bread is toasted and cheese is fully melted",
      recipe_id: 1,
    },
    { "step_#": 5, instruction: "ENJOY!!!", recipe_id: 1 },
  ]);
};
