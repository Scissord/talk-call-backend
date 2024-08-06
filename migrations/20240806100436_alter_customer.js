/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .alterTable('customer', (table) => {
      table.dropColumn('lead_id');
      table.string('buyer_phone', 255).nullable();
      table.string('avatar', 255).nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema
    .alterTable('customer', (table) => {
      table.bigInteger('lead_id').notNullable();
      table.dropColumn('buyer_phone');
    });
};
