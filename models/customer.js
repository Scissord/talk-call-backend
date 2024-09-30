import knex from './knex.js';

const db = knex();

export const get = async function (limit, page, search, status, manager_id) {
  const result = await db('message as m')
    .select(
      'm.customer_id',
      db.raw('MAX(m.created_at) as last_message_date'),
      db.raw('(SELECT text FROM message WHERE customer_id = m.customer_id ORDER BY created_at DESC LIMIT 1) as last_message_text'),
      'c.*',
      db.raw('(SELECT u.name FROM user as u WHERE u.id = m.user_id ORDER BY m.created_at DESC LIMIT 1) as manager_name'),
      db.raw('(SELECT COUNT(*) FROM message WHERE message.customer_id = c.id AND message.is_checked = false) as counter')
    )
    .leftJoin('customer as c', 'm.customer_id', 'c.id')
    .where((q) => {
      if (search) {
        q.where('c.order_id', 'ilike', `%${search}%`)
          .orWhere('c.phone', 'ilike', `%${search}%`)
          .orWhere('c.name', 'ilike', `%${search}%`);
      }
      if (status !== 100) {
        q.where('c.status', status);
        q.where('c.manager_id', manager_id);
      }
    })
    .groupBy('m.customer_id', 'c.id')
    .orderBy('last_message_date', 'desc')
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  return result.data;
};


export const getForBoard = async function (status) {
  return await db('message as m')
    .select(
      'm.customer_id',
      db.raw('MAX(m.created_at) as last_message_date'),
      db.raw('(SELECT text FROM message WHERE customer_id = m.customer_id ORDER BY created_at DESC LIMIT 1) as last_message_text'),
      'c.*',
      'u.name as manager_name',
      db.raw('(SELECT COUNT(*) FROM message WHERE message.customer_id = c.id AND message.is_checked = false) as counter')
    )
    .leftJoin('customer as c', 'm.customer_id', 'c.id')
    .leftJoin('user as u', 'm.user_id', 'u.id')
    .where((q) => {
      if (status !== 100) {
        q.where('c.status', status);
      }
    })
    .groupBy('m.customer_id', 'c.id', 'u.name')
    .orderBy('last_message_date', 'desc')
};

export const create = async function (data) {
  const [customer] = await db("customer")
    .insert(data)
    .returning("id")

  data.id = customer.id;
  return data;
};

export const find = async function (id) {
  return await db('customer')
    .select('*')
    .where('id', id)
    .first();
};

export const findWhere = async function (condition) {
  return await db('customer')
    .select('*')
    .where(condition)
    .first();
};

export const findByPhone = async function (phone) {
  return await db('customer')
    .select('*')
    .where('phone', phone)
    .first();
};

export const update = async function (id, data) {
  const [customer] = await db("customer")
    .where("id", id)
    .update(data)
    .returning("*");

  return customer;
};
