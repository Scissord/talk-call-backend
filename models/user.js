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

export const findOne = async function (query) {
  return await db('user')
    .select('*')
    .modify((queryBuilder) => {
      // Регулярное выражение для проверки телефона
      // Поддержка номеров, начинающихся с + и цифр, и состоящих из 10-15 цифр
      const phonePattern = /^(\+?\d{1,3})?\d{10,15}$/;

      // Регулярное выражение для проверки почты (основные проверки, могут быть улучшены)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Проверяем, соответствует ли запрос шаблону телефона
      if (phonePattern.test(query)) {
        queryBuilder.where('phone', query);
      }
      // Проверяем, соответствует ли запрос шаблону почты
      else if (emailPattern.test(query)) {
        queryBuilder.where('email', query);
      }
      // Если это не телефон и не почта, то предполагаем, что это имя
      else {
        queryBuilder.where('name', query);
      }
    })
    .first();
};

export const findById = async function (id) {
  return await db('user')
   .select('*')
   .where('id', id)
   .first();
}




