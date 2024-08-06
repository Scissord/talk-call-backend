/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('attachment', (table) => {
      table.bigIncrements('id').primary();
      table.bigInteger('message_id').notNullable();
      table.string('type', 255).notNullable();
      table.string('url', 255).notNullable();
      table.integer('size').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('attachment');
};
