/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('conversation', (table) => {
      table.bigIncrements('id').primary();
      table.bigInteger('customer_id').notNullable();
      table.tinyint('status').defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('conversation');
};
