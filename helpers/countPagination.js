import knex from '../models/knex.js';

const db = knex();

export default async function(table, limit, page, search, status) {
  const offset = (page - 1) * limit;

  const total = await db(table)
    .count('* as count')
    .where((q) => {
      search && q.where('name', 'ilike', `%${search}%`);
      status && q.where('status', status);
    })
    .first();

  const lastPage = Math.ceil(+total.count / +limit);

  return {
    offset,
    lastPage
  }
}