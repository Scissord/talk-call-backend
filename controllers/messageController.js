import * as Message from "../models/message.js";
import * as Customer from "../models/customer.js";
import redisClient from '../services/redis/redis.js';
import sendTextMessage from '../services/greenApi/sendTextMessage.js';
import sendFileMessage from '../services/greenApi/sendFileMessage.js';

export const get = async (req, res) => {
	try {
    const conversation_id = req.params.conversation_id
    // Попробуйте сначала получить сообщения из Redis
		const cachedMessages = await redisClient.get(conversation_id);
		if (cachedMessages) {
			return res.status(200).send({ message: 'ok', messages: JSON.parse(cachedMessages) });
		};

    const messages = await Message.getChat(conversation_id);

		await redisClient.setEx(conversation_id, 3600, JSON.stringify(messages));

		res.status(200).send({ message: 'ok', messages });
	}	catch (err) {
		console.log("Error in get message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
  try {
    const { customer_id, message, type } = req.body;

    const customer = await Customer.find(customer_id);
    const conversation_id = req.params.conversation_id;
    const file = req.files[0];

    let obj = null;

    if(type === 'textMessage') {
      obj = await sendTextMessage(customer, message, conversation_id);
    };

    if(type === 'fileMessage') {
      obj = await sendFileMessage(customer, file, conversation_id);
    };

    // Получаем текущие сообщения из Redis
    let messages = await redisClient.get(conversation_id);
    messages = messages ? JSON.parse(messages) : [];

    // Добавляем новое сообщение в список
    messages.push(obj);

    // Обновляем кэш в Redis
    await redisClient.setEx(conversation_id, 3600, JSON.stringify(messages));

		res.status(200).send({ message: obj });
	}	catch (err) {
		console.log("Error in post message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
