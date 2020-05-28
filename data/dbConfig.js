const knex = require("knex")({ client: "pg" });
const knexConfig = require("../knexfile");

module.exports = knex(knexConfig[process.env.NODE_ENV]);
