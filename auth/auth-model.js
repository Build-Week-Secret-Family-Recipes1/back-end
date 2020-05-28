const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

function find() {
  return db("users").select("user_id", "email", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [user_id] = await db("users").insert(user).returning("user_id");

  return findById(user_id);
}

function findById(user_id) {
  return db("users")
    .where({ user_id })
    .select("user_id", "email", "username", "password")
    .first();
}

function remove(user_id) {
  return db("users").where({ user_id }).del();
}
