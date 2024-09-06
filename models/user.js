import knex from './knex.js';

const db = knex();

export const get = async function (role) {
  return await db('user')
    .select('*')
    .modify((q) => {
      if(+role === 2) {
        q.where('role', 1);
      };
      if(+role === 5) {
        q.where('role', 3);
      };
      if(+role === 6) {
        q.where('role', 4);
      };
    })
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

export const find = async function (id) {
  return await db('user')
    .select('*')
    .where('id', id)
    .first();
};

export const findOne = async function (name) {
  return await db('user')
    .select('*')
    .where('name', name)
    .first();
};

export const findById = async function (id) {
  return await db('user')
   .select('*')
   .where('id', id)
   .first();
};

export const update = async function (id, data) {
  const [user] = await db("user")
    .where("id", id)
    .update(data)
    .returning("*");

  return user;
};

export const destroy = async function (id) {
  return await db('user')
    .del()
    .where('id', id);
};
