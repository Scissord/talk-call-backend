import axios from "axios";
import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";

export const getIncomingMessages = async (req, res) => {
	try {
    if (!req.body || req.body.type !== 'message.incoming') {
      return res.status(400).send({ error: "Bad Request" });
    };

    if(req.body.type === 'message.incoming') {
      const customer_name = req.body.message.sender.login;
      const customer_phone = req.body.message.sender.socialId;
      const buyer_phone = req.body.message.sa.login;
      const customer_avatar = req.body.message.sender.avatar;
      const message = req.body.message.message.text;

      // check if customer exist
      let customer = await Customer.findByPhone(customer_phone)
      if(!customer) {
        customer = await Customer.create({
          name: customer_name,
          phone: customer_phone,
          avatar: customer_avatar,
          buyer_phone
        });
      };

      let conversation = await Conversation.findByCustomerId(customer.id);
      if(!conversation) {
        conversation = await Conversation.create({ customer_id: customer.id });
      };

      await Message.create({
        conversation_id: conversation.id,
        text: message,
        incoming: true
      });
    };

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
