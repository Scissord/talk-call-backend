import * as Conversation from "../models/conversation.js";
import * as Customer from "../models/customer.js";
import * as Message from "../models/message.js";

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { role } = req.user;

    let status = 0;

    if(role === 1 || role === 2) {
      status = 0;
    };

    if(role === 3 || role === 4) {
      status = 1;
    };

    if(role === 5 || role === 6) {
      status = 2;
    };

    if(role === 7) {
      status = 3;
    };

    const { conversations, lastPage } = await Conversation.get(limit, page, search, status);

		res.status(200).send({ message: 'ok', conversations, lastPage });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
