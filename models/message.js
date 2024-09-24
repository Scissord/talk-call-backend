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

export const getChat = async function (customer_id) {
  return await db('message as m')
    .select('m.*', 'cu.avatar', 'u.name as manager_name')
    .select(db.raw('COALESCE(json_agg(a.*) FILTER (WHERE a.id IS NOT NULL), \'[]\') as attachments'))
    .leftJoin('attachment as a', 'a.message_id', 'm.id')
    .leftJoin('customer as cu', 'cu.id', 'm.customer_id')
    .leftJoin('user as u', 'u.id', 'message.user_id')
    .where('customer_id', customer_id)
    .groupBy('m.id', 'cu.avatar');
};

export const getLast = async function (customer_id) {
  return await db('message as m')
    .select('m.text')
    .where('m.customer_id', customer_id)
    .orderBy('m.id', 'desc')
    .first();
};

export const find = async function (message_id) {
  return await db('message as m')
    .select('m.*')
    .where('m.id', message_id)
    .first();
};
