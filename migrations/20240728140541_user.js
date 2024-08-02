/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('user', (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 50).notNullable();
      table.string('password', 255).notNullable();
      table.tinyint('role').defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('user');
};
