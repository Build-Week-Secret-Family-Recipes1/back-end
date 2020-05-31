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
  return db("users").where(filter);
}

function findById(id) {
  return (
    db("users")
      .where({ id })
      // .select("user_id", "email", "username", "password")
      .first()
  );
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function remove(id) {
  return db("users").where({ id }).del();
}
