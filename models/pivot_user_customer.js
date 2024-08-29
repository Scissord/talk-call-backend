import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('pivot_user_customer').select('*')
};

export const find = async function (user_id, customer_id) {
  return await db('pivot_user_customer')
    .select('*')
    .where('user_id', user_id)
    .andWhere('customer_id', customer_id)
    .first();
};

export const destroy = async function (user_id, customer_id) {
  return await db('pivot_user_customer')
    .del()
    .where('user_id', user_id)
    .andWhere('customer_id', customer_id)
};

export const create = async function (data) {
  const [pivot_user_customer] = await db("pivot_user_customer")
    .insert(data)
    .returning("id")

  data.id = pivot_user_customer.id;
  return data;
};