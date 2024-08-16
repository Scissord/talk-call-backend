/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .alterTable('customer', (table) => {
      table.dropColumn('saId');
      table.dropColumn('source');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema
    .alterTable('customer', (table) => {
      table.bigInteger('saId').notNullable();
      table.bigInteger('source').notNullable();
    });
};
