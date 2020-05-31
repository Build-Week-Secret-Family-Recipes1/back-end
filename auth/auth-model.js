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
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .select("user_id", "email", "username", "password")
    .first();
}

function remove(id) {
  return db("users").where({ id }).del();
}
