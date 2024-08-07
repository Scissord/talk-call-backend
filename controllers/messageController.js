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
    const { customer_id, lead_id, message } = req.body;

    const customer = await Customer.find(customer_id);
    const conversation_id = req.params.conversation_id;
    const files = req.body.files;

    try {
      await axios({
        method: 'POST',
        url: `${process.env.UMNICO_URL}/v1.3/messaging/${lead_id}/send`,
        data: {
          message: {
            text: message,
            attachment: null,
            // attachment: files[0]
          },
          source: customer.source,
          userId: req.user.umnico_user_id
        },
        headers: {
          'Authorization': `Bearer ${process.env.UMNICO_API_TOKEN}`
        }
      }).then(async (res) => {
        console.log(res)
        // const message = await Message.create({
        //   conversation_id,
        //   text: message,
        //   incoming: false,
        //   lead_id:
        // })
      });
    } catch (error1) {
      console.error('Error sending message 1-way:', error1.response.data.errors);
      try {
        await axios({
          method: 'POST',
          url: `${process.env.UMNICO_URL}/v1.3/messaging/post`,
          data: {
            message: {
              text: req.body.message,
              attachment: files[0] || null,
            },
            destination: customer.phone,
            saId: customer.saId
          },
          headers: {
            'Authorization': `Bearer ${process.env.UMNICO_API_TOKEN}`
          }
        }).then(async (res) => {
          console.log(res)
          // const message = await Message.create({
          //   conversation_id,
          //   text: message,
          //   incoming: false,
          //   lead_id:
          // })
        });
      } catch (error2) {
        console.error('Error sending message 2-way:', error2.response.data.errors);
        res.status(400).send({ error: 'Ошибка, при отправке сообщения!' });
      }
    }

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in post message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
