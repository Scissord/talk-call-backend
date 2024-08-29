import knex from './knex.js';
import { countOffset, countOffsetWithFavorites } from '../helpers/countPagination.js';

const db = knex();

export const get = async function (limit, page, search, status) {
  console.log("get >>");

  const offset = await countOffset(
    'customer', limit, page,
    search, status
  );

  const customers = await db('customer as cu')
    .select('cu.*')
    .where((q) => {
      search && q.where('cu.name', 'ilike', `%${search}%`);
      if(status !== 3) {
        q.where('cu.status', status);
      };
    })
    .limit(limit)
    .offset(offset)
    .orderBy('cu.id', 'desc');

  return customers
};

export const getFavorites = async function (limit, page, search, status, user_id) {
  console.log("getFavorites >>");

  const offset = await countOffsetWithFavorites(
    limit, page, search, status, user_id
  );

  const customers = await db('customer as cu')
    .select('cu.*')
    .leftJoin('pivot_user_customer as puc', 'puc.customer_id', 'cu.id')
    .where((q) => {
      search && q.where('cu.name', 'ilike', `%${search}%`);
      if(status !== 3) {
        q.where('cu.status', status);
      };
    })
    .limit(limit)
    .offset(offset)
    .where('puc.user_id', user_id)
    .orderBy('cu.id', 'desc');

  return customers
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
