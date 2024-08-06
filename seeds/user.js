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
      name: 'user1',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 1
    },
    {
      id: 2,
      name: 'user2',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 2
    },
    {
      id: 3,
      name: 'user3',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 3
    },
    {
      id: 4,
      name: 'user4',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 4
    },
    {
      id: 5,
      name: 'user5',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 5
    },
    {
      id: 6,
      name: 'user6',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 6
    },
    {
      id: 7,
      name: 'user7',
      password: "$2a$10$Wpr1RN.sAJpEmxNb4pKB3.j7CU4cqObQhzyES7I1Qb/QBoBATW4I2",
      role: 7
    },
  ]);
};
