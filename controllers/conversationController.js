import * as Customer from "../models/customer.js";
import * as Conversation from "../models/conversation.js";
import * as Message from "../models/message.js";

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { role } = req.user;
    const { conversations, lastPage } = await Conversation.get(limit, page, search, role);

		res.status(200).send({ message: 'ok', conversations, lastPage });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
