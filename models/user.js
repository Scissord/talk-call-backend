import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('user').select('*')
};

export const create = async function (data) {
  const [user] = await db("user")
    .insert(data)
    .returning("id")

  data.id = user.id;
  return data;
};

export const isExist = async function (name, phone) {
  return await db('user')
    .select('*')
    .where('name', name)
    .andWhere('phone', phone)
    .first();
};

export const findOne = async function (login) {
  return await db('user')
    .select('*')
    .where('name', login)
    .first();
};

export const findById = async function (id) {
  return await db('user')
   .select('*')
   .where('id', id)
   .first();
}




