exports.up = async function (knex) {
  await knex.schema.createTable("recipes", (table) => {
    table.increments("recipe_id");
    table.string("name").notNullable().unique();
    table.float("prep_time");
    table.string("category", 128);
    table.text("source");
    table.text("img_path");
    table.integer("user_id").notNullable();
  });

  await knex.schema.createTable("ingredients", (table) => {
    table.increments("ingr_id");
    table.text("ingr_name");
    table.float("amount");
    table.integer("recipe_id");
  });

  await knex.schema.createTable("instructions", (table) => {
    table.increments("instr_id");
    table.integer("step_#");
    table.text("instruction");
    table.text("recipe_id");
  });

  await knex.schema.createTable("interTable", (table) => {
    table.increments("inter_id");
    table.integer("recipe_id").notNullable();
    table.integer("ingr_id").notNullable();
    table.integer("user_id").notNullable();
  });

  await knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("email", 128);
    table.string("username", 128);
    table.string("password", 128);
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
