/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .alterTable('user_token', (table) => {
      table.bigInteger('cabinetUserId').notNullable();
      table.bigInteger('expires_at').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema
    .alterTable('user_token', (table) => {
      table.dropColumn('cabinetUserId');
      table.dropColumn('expires_at');
    });
};
