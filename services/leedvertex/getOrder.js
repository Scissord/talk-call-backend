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
    console.log(order);
    console.log(order.webmaster);
    console.log(order.goods);



    // const customer = await Customer.create({

    // });
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
  return;
};
