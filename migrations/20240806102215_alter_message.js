/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .alterTable('message', (table) => {
      table.boolean('incoming').defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema
    .alterTable('message', (table) => {
      table.dropColumn('incoming');
    });
};
