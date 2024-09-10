import knex from './knex.js';

const db = knex();

export const get = async function (limit, page, search, status, manager_id) {
  console.log(status, manager_id);

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
