import * as Message from "../models/message.js";
import * as Customer from "../models/customer.js";
import * as PivotStorageUser from "../models/pivot_user_customer.js";
import redisClient from '../services/redis/redis.js';
import sendTextMessage from '../services/greenApi/sendTextMessage.js';
import sendFileMessage from '../services/greenApi/sendFileMessage.js';

export const get = async (req, res) => {
	try {
    const customer_id = req.params.customer_id

    const cachedMessages = await redisClient.get(customer_id);
		if (cachedMessages) {
			return res.status(200).send({ message: 'ok', messages: JSON.parse(cachedMessages) });
		};

    const messages = await Message.getChat(customer_id);

    const exist = await PivotStorageUser.find(req.user.id, customer_id);
    const isFavorite = !!exist;

    console.log(isFavorite)

    // 1h
		await redisClient.setEx(customer_id, 3600, JSON.stringify(messages));

		res.status(200).send({ message: 'ok', messages, isFavorite });
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
      obj = await sendTextMessage(customer, message, customer_id);
    };

    if(type === 'fileMessage') {
      obj = await sendFileMessage(customer, file, customer_id);
    };

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
