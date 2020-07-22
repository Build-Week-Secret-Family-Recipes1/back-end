exports.up = async function (knex) {
  await knex.schema.createTable("recipes", (table) => {
    table.integer("user_id");
    table.increments("recipe_id");
    table.string("name").notNullable();
    table.float("prep_time");
    table.string("category", 128);
    table.text("source");
    table.text("img_path");
  });

  await knex.schema.createTable("ingredients", (table) => {
    table.integer("user_id");
    table.increments("ingr_id");
    table.text("ingr_name");
    table.float("amount");
    table.integer("recipe_id");
  });

  await knex.schema.createTable("instructions", (table) => {
    table.integer("user_id");
    table.increments("instr_id");
    table.integer("step_#");
    table.text("instruction");
    table.integer("recipe_id");
  });

  await knex.schema.createTable("interTable", (table) => {
    table.increments("inter_id");
    table.integer("recipe_id").notNullable();
    table.integer("ingr_id").notNullable();
    table.integer("user_id").notNullable();
  });

  await knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("email", 128).notNullable().unique();
    table.string("username", 128).notNullable();
    table.string("password", 128).notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("instructions")
    .dropTableIfExists("interTable")
    .dropTableIfExists("users");
};
