import knex from './knex.js';
import countPagination from '../helpers/countPagination.js';

const db = knex();

export const get = async function (limit, page, search, type, status) {
  const { offset } = await countPagination(
    'conversation', limit, page,
    search, type, status
  );

  const conversations = await db('conversation')
    .select('*')
    .where((q) => {
      search && q.where('name', 'ilike', `%${search}%`);
      status && q.where('status', status);
      type && q.where('isFavorite', type);
    })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc');

  return {
    conversations,
    lastPage
  }
};

export const findByCustomerId = async function (customer_id) {
  return await db('conversation')
    .select('*')
    .where('customer_id', customer_id)
    .first();
};

export const create = async function (data) {
  const [conversation] = await db("conversation")
    .insert(data)
    .returning("id")

  data.id = conversation.id;
  return data;
};
