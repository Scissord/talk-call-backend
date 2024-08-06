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
    .select('m.*', 'cu.avatar')
    .select(db.raw('COALESCE(json_agg(a.*) FILTER (WHERE a.id IS NOT NULL), \'[]\') as attachments'))
    .leftJoin('attachment as a', 'a.message_id', 'm.id')
    .leftJoin('conversation as co', 'co.id', 'm.conversation_id')
    .leftJoin('customer as cu', 'cu.id', 'co.customer_id')
    .where('conversation_id', conversation_id)
    .groupBy('m.id');
};
