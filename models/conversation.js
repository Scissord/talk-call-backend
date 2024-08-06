import knex from './knex.js';
import countPagination from '../helpers/countPagination.js';

const db = knex();

export const get = async function (limit, page, search, type, status) {
  const { offset } = await countPagination(
    'conversation', limit, page,
    search, type, status
  );

  const conversations = await db('conversation as co')
    .select('co.*', 'cu.*')
    .leftJoin('customer as cu', 'cu.id', 'co.customer_id')
    .where((q) => {
      search && q.where('co.name', 'ilike', `%${search}%`);
      if(status) {
        q.where('co.status', status);
      }
      type && q.where('co.isFavorite', type);
    })
    .limit(limit)
    .offset(offset)
    .orderBy('co.id', 'desc');

  return {
    conversations,
    // lastPage
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

export const updateByCustomerId = async function (customer_id, data) {
  const [conversation] = await db("conversation")
    .where("customer_id", customer_id)
    .update(data)
    .returning("*");

  return conversation;
};
