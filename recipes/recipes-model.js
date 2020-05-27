const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

function find() {
  return db("recipes").select("user_id", "email", "username", "password");
}

function findBy(filter) {
  return db("recipes").where(filter);
}

async function add(user) {
  const [user_id] = await db("recipes").insert(user);

  return findById(user_id);
}

function findById(user_id) {
  return db("recipes")
    .where({ user_id })
    .select("user_id", "email", "username", "password")
    .first();
}

function remove(user_id) {
  return db("recipes").where({ user_id }).del();
}
