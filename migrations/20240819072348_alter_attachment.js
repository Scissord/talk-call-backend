/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .alterTable('attachment', (table) => {
      table.dropColumn('type');
      table.dropColumn('url');
      table.dropColumn('size');
      table.string('link', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('contentType', 255).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema
    .alterTable('attachment', (table) => {
      table.string('type', 255).notNullable();
      table.string('url', 255).notNullable();
      table.integer('size').nullable();
      table.dropColumn('link');
      table.dropColumn('name');
      table.dropColumn('contentType');
    });
};
