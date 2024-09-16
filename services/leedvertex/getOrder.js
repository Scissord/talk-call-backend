import axios from 'axios';
import * as Customer from '../../models/customer.js';
import * as Column from '../../models/column.js';
import sendTextMessage from '../greenApi/sendTextMessage.js';
import updateAvatar from '../greenApi/updateAvatar.js';
import redisClient from '../redis/redis.js';

export default async function getOrder(order_id, text, user_id, status) {
  let customer = await Customer.findWhere({ order_id: order_id });

  if(!customer) {
    const res = await axios({
      method: 'GET',
      url: `https://call-center1.leadvertex.ru/api/admin/getOrdersByIds.html?token=${process.env.LEADVERTEX_API_KEY}&ids=${order_id}`,
    })

    if(res.status === 200) {
      const order = res.data[order_id];

      const goodKeys = Object.keys(order.goods);
      const firstGoodKey = goodKeys[0];
      const firstGood = order.goods[firstGoodKey];

      customer = await Customer.create({
        name: order.fio,
        phone: order.phone + '@c.us',
        buyer_phone: '77752426015@c.us',
        good: firstGood.goodID,
        ai_active: false,
        status: status,
        manager_id: user_id,
        order_id
      });
    };
  };

  const message = await sendTextMessage(user_id, customer, text, customer.id);
  await updateAvatar(customer);

  let messages = await redisClient.get(customer.id);
  messages = messages ? JSON.parse(messages) : [];

  messages.push(message);

  await redisClient.setEx(customer.id, 3600, JSON.stringify(messages));

  const column = await Column.getByManagerId(user_id);
  const newIds = Array.isArray(column.cards_ids) ? [...column.cards_ids] : [];
  newIds.unshift(customer.id);
  await Column.updateByManagerId(user_id, { cards_ids: newIds });

  return customer
};
