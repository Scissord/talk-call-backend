/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('role').del()
  await knex('role').insert([
    {
      id: 1,
      label: 'Оператор продажник колл центр',
    },
    {
      id: 2,
      label: 'Руководитель продажников',
    },
    {
      id: 3,
      label: 'Оператор ВЛ',
    },
    {
      id: 4,
      label: 'Руководитель ВЛ',
    },
    {
      id: 5,
      label: 'Оператор логистики',
    },
    {
      id: 6,
      label: 'Руководитель логисики',
    },
    {
      id: 7,
      label: 'Админ главный',
    },
  ]);
};
