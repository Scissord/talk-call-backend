import axios from "axios";
import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";

export const getIncomingMessages = async (req, res) => {
	try {
    console.log(req.body);

    if (!req.body || req.body.type !== 'message.incoming') {
      return res.status(400).send({ error: "Bad Request" });
    };

    if(req.body.type === 'message.incoming') {
      const { isNewCustomer, leadId, message } = req.body;

      // Проверка наличия leadId
      if (!leadId) {
        return res.status(400).send({ error: "Missing leadId" });
      };

      // Проверка наличия сообщения
      if (!message) {
        return res.status(400).send({ error: "Missing message" });
      };

      if(isNewCustomer) {
        const customer = await Customer.create({ lead_id: leadId });
        const conversation = await Conversation.create({ customer_id: customer.id });
        await Message.create({
          conversation_id: conversation.id,
          text: message
        });
      };
    };

		res.status(200).send({ message: ok });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
