const knex = require("knex");
const knexConfig = require("../knexfile");
const nodeEnv = process.env.NODE_ENV || "production";

module.exports = knex(knexConfig[nodeEnv]);
