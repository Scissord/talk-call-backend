import knex from './knex.js';
import countPagination from '../helpers/countPagination.js';

const db = knex();

export const get = async function (limit, page, search, status) {
  const { offset, lastPage } = await countPagination('conversation', limit, page, search, status);

  const conversations = await db('conversation')
    .select('*')
    .where((q) => {
      search && q.where('name', 'ilike', `%${search}%`);
      status && q.where('status', status);
    })
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc');

  return {
    conversations,
    lastPage
  }
};

export const create = async function (data) {
  const [conversation] = await db("conversation")
    .insert(data)
    .returning("id")

  data.id = conversation.id;
  return data;
};