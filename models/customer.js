import knex from './knex.js';

const db = knex();

export const get = async function (limit, page, search, status, manager_id) {
  const result = await db('message as m')
    .select(
      'c.id as id',
      'c.name as name',
      'c.avatar as avatar',
      'c.good as good',
      'c.order_id as order_id',
      'u.id as manager_id',
      'u.name as manager_name',
      'm.text as last_message_text',
      'm.created_at as last_message_date',
      db.raw(`(SELECT COUNT(*) FROM message WHERE customer_id = c.id AND is_checked = false) as counter`)
    )
    .join('customer as c', 'm.customer_id', 'c.id')
    .leftJoin('user as u', 'c.manager_id', 'u.id')
    .whereIn('m.id', function () {
      this.select(db.raw('MAX(id)'))
          .from('message')
          .groupBy('customer_id');
    })
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
    .orderBy('m.created_at', 'desc')
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  return result.data;
};

export const getForBuyers = async function (limit, page, search, phone) {
  const result = await db('message as m')
    .select(
      'c.id as id',
      'c.name as name',
      'c.avatar as avatar',
      'c.good as good',
      'c.order_id as order_id',
      'c.buyer_phone as buyer_phone',
      'u.id as manager_id',
      'u.name as manager_name',
      'm.text as last_message_text',
      'm.created_at as last_message_date',
      db.raw(`(SELECT COUNT(*) FROM message WHERE customer_id = c.id AND is_checked = false) as counter`)
    )
    .join('customer as c', 'm.customer_id', 'c.id')
    .leftJoin('user as u', 'c.manager_id', 'u.id')
    .whereIn('m.id', function () {
      this.select(db.raw('MAX(id)'))
          .from('message')
          .groupBy('customer_id');
    })
    .where((q) => {
      if (search) {
        q.where('c.order_id', 'ilike', `%${search}%`)
          .orWhere('c.phone', 'ilike', `%${search}%`)
          .orWhere('c.name', 'ilike', `%${search}%`);
      }
      q.where("c.buyer_phone", phone)
      // q.where("c.status", 4)
    })
    .orderBy('m.created_at', 'desc')
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
      'c.id as id',
      'c.name as name',
      'c.avatar as avatar',
      'c.good as good',
      'c.order_id as order_id',
      'u.id as manager_id',
      'u.name as manager_name',
      'm.text as last_message_text',
      'm.created_at as last_message_date',
      db.raw(`(SELECT COUNT(*) FROM message WHERE customer_id = c.id AND is_checked = false) as counter`)
    )
    .join('customer as c', 'm.customer_id', 'c.id')
    .leftJoin('user as u', 'c.manager_id', 'u.id')
    .whereIn('m.id', function () {
      this.select(db.raw('MAX(id)'))
          .from('message')
          .groupBy('customer_id');
    })
    .where((q) => {
      if (status !== 100) {
        q.where('c.status', status);
      }
      q.where('c.deleted_manager', null);
    })
    .orderBy('m.created_at', 'desc')
};

export const updateWhenDeleteManager = async function (manager_id, newId) {
  return await db('customer')
    .update('manager_id', newId)
    .where('manager_id', manager_id)
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
