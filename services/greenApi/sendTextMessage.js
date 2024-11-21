import axios from 'axios';
import * as User from '../../models/user.js';
import * as Message from '../../models/message.js';
import * as Instance from '../../models/instance.js';
import * as Customer from '../../models/customer.js';
import randomInstance from '../instance/randomInstance.js';

export default async function sendTextMessage(user_id, customer, message, customer_id) {
  let instance = await Instance.findByBuyerPhone(customer.buyer_phone);

  if (!instance) {
    const newInstance = await randomInstance();
    instance = {
      instance_id: newInstance.randomInstanceId,
      api_token: newInstance.randomApiToken,
      phone: newInstance.randomBuyerPhone
    };

    await Customer.update(customer_id, {
      buyer_phone: newInstance.randomBuyerPhone,
    });
  };

  let isAuthorized = false;
  let maxRetries = 10;
  let attempts = 0;

  while (!isAuthorized && attempts < maxRetries) {
    const instanceStatus = await axios({
      method: 'GET',
      url: `${process.env.GREEN_API_URL}/waInstance${instance.instance_id}/getStateInstance/${instance.api_token}`,
    });

    if (instanceStatus.data.stateInstance === 'authorized') {
      isAuthorized = true;
    } else {
      const newInstance = await randomInstance();
      instance = {
        instance_id: newInstance.randomInstanceId,
        api_token: newInstance.randomApiToken,
        phone: newInstance.randomBuyerPhone,
      };

      await Customer.update(customer_id, {
        buyer_phone: newInstance.randomBuyerPhone,
      });

      attempts++;
    }
  }

  if(isAuthorized) {
    await axios({
      url: `${process.env.GREEN_API_URL}/waInstance${instance.instance_id}/sendMessage/${instance.api_token}`,
      method: 'POST',
      data: {
        chatId: customer.phone,
        message: message
      },
    })

    let obj = await Message.create({
      user_id,
      customer_id,
      text: message,
      incoming: false,
    });

    const manager = await User.find(user_id);
    obj.manager_name = manager.name;

    await Customer.update(customer_id, { manager_id: user_id });

    return obj;
  }
};
