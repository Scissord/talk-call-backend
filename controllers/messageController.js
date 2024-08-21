import axios from "axios";
import * as Message from "../models/message.js";
import * as Customer from "../models/customer.js";
import dotenv from 'dotenv';
dotenv.config();

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
    const { customer_id, message } = req.body;

    const customer = await Customer.find(customer_id);
    const conversation_id = req.params.conversation_id;
    const files = req.body.files;

    const response = await axios({
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

    if(response.status === 200) {
      await Message.create({
        conversation_id,
        text: message,
        incoming: false,
      });
    };

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in post message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
