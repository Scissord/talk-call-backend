/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('customer', (table) => {
      table.bigIncrements('id').primary();
      table.bigInteger('lead_id').notNullable();
      table.string('name', 255).nullable();
      table.string('phone', 255).nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('customer');
};
