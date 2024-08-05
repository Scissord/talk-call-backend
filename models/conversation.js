import knex from './knex.js';

const db = knex();

export const get = async function (status) {
  return await db('conversation')
    .select('*')
    .where('status', status);
};

export const create = async function (data) {
  const [conversation] = await db("conversation")
    .insert(data)
    .returning("id")

  data.id = conversation.id;
  return data;
};