exports.seed = function (knex) {
  return knex("recipes").insert([
    {
      name: "Grilled Cheese Sandwich",
      prep_time: "0.1",
      category: "sandwich",
      source: "Grandma",
      img_path:
        "images/grilled-cheese-sandwich-87992575-57ebfdd13df78c690f385704.jpg",
      username: "test_user",
    },
  ]);
};
