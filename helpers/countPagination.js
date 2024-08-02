import knex from '../models/knex.js';

const db = knex();

export default async function(table, limit, page, search) {
  const offset = (page - 1) * limit;

  const total = await db(table)
    .count('* as count')
    .where((q) => {
      search && q.where('name', 'ilike', `%${search}%`);
    })
    .where('deleted_at', null)
    .first();

  const lastPage = Math.ceil(+total.count / +limit);

  return {
    offset,
    lastPage
  }
}