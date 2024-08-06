import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('message').select('*')
};

export const create = async function (data) {
  const [message] = await db("message")
    .insert(data)
    .returning("id")

  data.id = message.id;
  return data;
};

export const getChat = async function (conversation_id) {
  return await db('message as m')
    .select('m.*', 'a.*')
    .leftJoin('attachment as a', 'a.message_id', 'm.id')
    .where('conversation_id', conversation_id)
};
