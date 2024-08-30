import axios from 'axios';
import * as Message from '../../models/message.js';

export default async function sendTextMessage(user_id, customer, message, customer_id) {
  const res = await axios({
    url: `${process.env.GREEN_API_URL}/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.API_TOKEN_INSTANCE}`,
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
