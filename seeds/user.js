/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      id: 1,
      name: 'Брокер 1',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 0
    },
    {
      id: 2,
      name: 'Руководитель продажников',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 1
    },
    {
      id: 3,
      name: 'Оператор ВЛ',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 2
    },
    {
      id: 4,
      name: 'Оператор логистики',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 3
    },
    {
      id: 5,
      name: 'Руководитель логисики',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 4
    },
    {
      id: 6,
      name: 'Руководитель логисики',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 5
    },
    {
      id: 7,
      name: 'Админ главный',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 6
    },
  ]);
};
