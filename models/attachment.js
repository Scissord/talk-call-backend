import knex from './knex.js';
import countPagination from '../helpers/countPagination.js';

const db = knex();

export const get = async function () {
  return await db('attachment').select('*')
};

export const create = async function (data) {
  const [attachment] = await db("attachment")
    .insert(data)
    .returning("id")

  data.id = attachment.id;
  return data;
};
