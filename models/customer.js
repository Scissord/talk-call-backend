import knex from './knex.js';

const db = knex();

export const get = async function (limit, page, search, status, manager_id) {
  const result = await db('customer')
    .select('*')
    .where((q) => {
      search && q.where('order_id', 'ilike', `%${search}%`);
      if(status !== 100) {
        q.where('status', status);
        q.where('manager_id', manager_id);
      };
    })
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  return {
    customers: result.data,
    lastPage: result.pagination.lastPage
  };
};

export const getForBoard = async function (status) {
  return await db('customer as c')
    .select('c.*', 'm.text as text')
    .leftJoin('message as m', function() {
      this.on('m.customer_id', 'c.id')
        .andOn('m.id', '=', db('message as m2')
          .select(db.raw('MAX(m2.id)'))
          .whereRaw('m2.customer_id = c.id')
        );
    })
    .where((q) => {
      if(status !== 100) {
        q.where('c.status', status);
      };
    })
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
