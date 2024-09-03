import knex from '../models/knex.js';

const db = knex();

export async function countOffset(limit, page) {
  const offset = (page - 1) * limit;

  return offset;
};

export async function countOffsetWithFavorites(limit, page) {
  const offset = (page - 1) * limit;

  return offset;
};