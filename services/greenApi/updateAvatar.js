import axios from 'axios';
import * as Customer from '../../models/customer.js';

export default async function updateAvatar(customer) {
  const res = await axios({
    url: `${process.env.GREEN_API_URL}/waInstance${process.env.INSTANCE_ID}/getAvatar/${process.env.API_TOKEN_INSTANCE}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      chatId: customer.phone,
    },
  })

  if(res.status === 200 && res.data.available === true) {
    await Customer.update(customer.id, {
      avatar: res.data.urlAvatar,
    });
  };

  return;
};
