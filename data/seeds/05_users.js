exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("table_name").insert([
    {
      id: 1,
      email: "test_user@gmail.com",
      username: "test_user",
      password: "testuser20",
    },
  ]);
};
