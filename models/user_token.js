import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('user_token').select('*')
};

export const create = async function (data) {
  const [user_token] = await db("user_token")
    .insert(data)
    .returning("id")

  data.id = user_token.id;
  return data;
};

export const update = async function (id, data) {
  const [user_token] = await db("user_token")
    .where({ id })
    .update(data)
    .returning("*");

  return user_token;
};

export const updateWhere = async function (condition, data) {
  const [user_token] = await db("user_token")
    .where(condition)
    .update(data)
    .returning("*");

  return user_token;
};

export const findByUserId = async function (user_id) {
  const user_token = await db("user_token")
    .select('*')
    .where("user_id", user_id)
    .first();

  return user_token
};

export const findByToken = async function (token) {
  const user_token = await db("user_token")
    .select('*')
    .where("token", token)
    .first();

  return user_token
};
