/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_token').del()
  await knex('user_token').insert([
    {
      id: 1,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },
    {
      id: 2,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },
    {
      id: 3,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },

    {
      id: 4,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },
    {
      id: 5,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },
    {
      id: 6,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },
    {
      id: 7,
      user_id: 'user1',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwianRpIjoiOGJkMDUwZDEtZTE2ZC00NzY4LWE3OTItMDFlNDZmZmQ0YWQ3IiwiaWF0IjoxNzIyOTI5MTQ2fQ.m4bEF_9hyBCj58Dp1LrtvT9tPERC9mIWUTdO5Kh5jV8",
    },
  ]);
};
