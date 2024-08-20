/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .alterTable('attachment', (table) => {
      table.string('link', 255).nullable();
      table.string('name', 255).nullable();
      table.string('contentType', 255).nullable();
      table.string('lat', 255).nullable();
      table.string('lon', 255).nullable();
      table.text('thumb', 255).nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema
    .alterTable('attachment', (table) => {
      table.string('link', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('contentType', 255).notNullable();
    });
};
