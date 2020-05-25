exports.up = async function (knex) {
  await knex.schema.createTable("recipes", (table) => {
    table.increments("recipe_id");
    table.string("name").notNullable().unique();
    table.float("prep_time");
    table.integer("category_id");
    table.text("source_id");
    table.text("ingredients");
  });

  await knex.schema.createTable("ingredients", (table) => {
    table.increments("ingr_id");
    table.text("ingr_name");
    table.float("amount");
  });

  await knex.schema.createTable("category", (table) => {
    table.increments("cat_id");
    table.text("type");
  });

  await knex.schema.createTable("instuctions", (table) => {
    table.increments("instr_id");
    table.integer("step_#");
    table.text("instruction");
    table.text("recipe_id");
  });

  await knex.schema.createTable("source", (table) => {
    table.increments("source_id");
    table.text("source");
  });

  await knex.schema.createTable("interTable", (table) => {
    table.increments("inter_id");
    table.integer("recipe_id").notNullable();
    table.integer("ingr_id").notNullable();
  });

  await knex.schema.createTable("images", (table) => {
    table.increments("image_id");
    table.text("name");
    table.blob("img_path");
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
    .dropTableIfExists("category")
    .dropTableIfExists("instructions")
    .dropTableIfExists("source")
    .dropTableIfExists("interTable")
    .dropTableIfExists("images")
    .dropTableIfExists("users");
};
