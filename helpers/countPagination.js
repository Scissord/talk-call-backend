import knex from '../models/knex.js';

const db = knex();

export async function countOffset(table, limit, page, search, status) {
  const offset = (page - 1) * limit;

  // const total = await db(table)
  //   .count('* as count')
  //   .where((q) => {
  //     search && q.where('name', 'ilike', `%${search}%`);
  //     if(status !== 3) {
  //       q.where('status', status);
  //     };
  //   })
  //   .first();

  return offset;
};

export async function countOffsetWithFavorites(limit, page, search, status, user_id) {
  const offset = (page - 1) * limit;

  // const total = await db('customer as cu')
  //   .count('cu.* as count')
  //   .leftJoin('pivot_user_customer as puc', 'puc.customer_id', 'cu.id')
  //   .where((q) => {
  //     search && q.where('cu.name', 'ilike', `%${search}%`);
  //     if(status !== 3) {
  //       q.where('cu.status', status);
  //     };
  //     user_id && q.where('puc.user_id', user_id);
  //   })
  //   .first();

  return offset;
};