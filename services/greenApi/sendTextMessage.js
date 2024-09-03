import axios from 'axios';
import * as Message from '../../models/message.js';
import * as Instance from '../../models/instance.js';

export default async function sendTextMessage(user_id, customer, message, customer_id) {
  console.log(customer.buyer_phone)
  const instance = await Instance.findByBuyerPhone(customer.buyer_phone);

  console.log(instance)

  const res = await axios({
    url: `${process.env.GREEN_API_URL}/waInstance${instance.instance_id}/sendMessage/${instance.api_token}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      chatId: customer.phone,
      message: message
    },
  })

  let obj = null;
  if(res.status === 200) {
    obj = await Message.create({
      user_id,
      customer_id,
      text: message,
      incoming: false,
    });
  };

  return obj;
};
