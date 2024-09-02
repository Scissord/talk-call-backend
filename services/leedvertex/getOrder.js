import axios from 'axios';
import * as Customer from '../../models/customer.js';
import * as Message from '../../models/message.js';

export default async function getOrder(order_id, text) {
  const res = await axios({
    method: 'GET',
    url: `https://call-center1.leadvertex.ru/api/admin/getOrdersByIds.html?token=${process.env.LEADVERTEX_API_KEY}&ids=${order_id}`,
  })

  if(res.status === 200) {
    const order = res.data[order_id];

    // good
    const goodKeys = Object.keys(order.goods);
    const firstGoodKey = goodKeys[0];
    const firstGood = order.goods[firstGoodKey]

    console.log(firstGood);
    console.log(firstGood.goodID);

    let customer = await Customer.findWhere({ order_id: order_id })
    if(customer) {
      return {
        message: 'error'
      }
    } else {
      // customer = await Customer.create({
      //   name: order.fio,
      //   phone: order.phone,
      //   buyer_phone: 'test@c.us',
      //   good:
      // });
      return {
        message: 'success'
      }
    };
  };


  // let obj = null;

  // if(res.status === 200) {
  //   obj = await Message.create({
  //     user_id,
  //     customer_id,
  //     text: "",
  //     incoming: false,
  //   });

  // return obj;
};
