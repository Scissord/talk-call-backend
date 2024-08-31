import * as Message from "../models/message.js";
import * as Customer from "../models/customer.js";
import * as PivotUserCustomer from "../models/pivot_user_customer.js";
import redisClient from '../services/redis/redis.js';
import sendTextMessage from '../services/greenApi/sendTextMessage.js';
import sendFileMessage from '../services/greenApi/sendFileMessage.js';

export const get = async (req, res) => {
	try {
    const customer_id = req.params.customer_id
    let isFavorite = false;

    const cachedMessages = await redisClient.get(customer_id);
		if (cachedMessages) {
      const exist = await PivotUserCustomer.find(req.user.id, customer_id);
      isFavorite = !!exist

			return res.status(200).send({
        message: 'ok',
        messages: JSON.parse(cachedMessages),
        isFavorite
      });
		};

    const messages = await Message.getChat(customer_id);

    // 1h
		await redisClient.setEx(customer_id, 3600, JSON.stringify(messages));

    const exist = await PivotUserCustomer.find(req.user.id, customer_id);
    isFavorite = !!exist

		res.status(200).send({
      message: 'ok',
      messages,
      isFavorite
    });
	}	catch (err) {
		console.log("Error in get message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
    const { customer_id, message, type } = req.body;

    const customer = await Customer.find(customer_id);
    const file = req.files[0];

    let obj = null;

    if(type === 'textMessage') {
      obj = await sendTextMessage(req.user.id, customer, message, customer_id);
    };

    if(type === 'fileMessage') {
      obj = await sendFileMessage(req.user.id, customer, file, customer_id);
    };

    console.log(typeof customer_id);

    let messages = await redisClient.get(customer_id);
    messages = messages ? JSON.parse(messages) : [];

    messages.push(obj);

    await redisClient.setEx(customer_id, 3600, JSON.stringify(messages));

		res.status(200).send({ message: obj });
	}	catch (err) {
		console.log("Error in post message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const cache = async (req, res) => {
  try {
    const message = req.body;

    console.log('cache', message);

    let messages = await redisClient.get(message.customer_id);

    console.log(messages);

    if(messages.length > 0) {
      messages = JSON.parse(messages)
      messages.push(message);
    } else {
      messages = await Message.getChat(message.customer_id);
    };

    await redisClient.setEx(message.customer_id, 3600, JSON.stringify(messages));

		res.status(200).send({ message: obj });
	}	catch (err) {
		console.log("Error in cache message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
