import axios from "axios";
import * as Message from "../models/message.js";
import * as Customer from "../models/customer.js";
import sendTextMessage from '../services/greenApi/sendTextMessage.js';
import sendFileMessage from '../services/greenApi/sendFileMessage.js';
import sendLocationMessage from '../services/greenApi/sendLocationMessage.js';

export const get = async (req, res) => {
	try {
    const conversation_id = req.params.conversation_id
    const messages = await Message.getChat(conversation_id);

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
    const files = req.files;

    let obj = null;

    if(type === 'textMessage') {
      obj = sendTextMessage(customer, message, conversation_id);
      return;
    };

    if(type === 'fileMessage') {
      obj = sendFileMessage(customer, files, conversation_id);
      return;
    };

    if(type === 'locationMessage') {
      obj = sendLocationMessage();
      return;
    };

		res.status(200).send({ message: obj });
	}	catch (err) {
		console.log("Error in post message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
