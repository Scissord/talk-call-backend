import axios from 'axios';
import * as Customer from '../../models/customer.js';
import * as Instance from '../../models/instance.js';

export default async function updateAvatar(customer) {
  const instance = await Instance.findByBuyerPhone(customer.buyer_phone);

  const res = await axios({
    url: `${process.env.GREEN_API_URL}/waInstance${instance.instance_id}/getAvatar/${instance.api_token}`,
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
