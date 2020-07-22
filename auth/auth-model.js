const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

function find() {
  return db("users");
}

function findBy(filter) {
  console.log(filter);
  return db("users").select("*").where(filter);
}

function findById(user_id) {
  return db("users")
    .where({ user_id })
    .select("user_id", "email", "username", "password")
    .first();
}

async function add(user) {
  const [user_id] = await db("users").insert(user, "user_id");

  return findById(user_id);
}

function remove(user_id) {
  return db("users").where({ user_id }).del();
}
