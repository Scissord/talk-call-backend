import * as Conversation from "../models/conversation.js";
import * as Customer from "../models/customer.js";
import * as Message from "../models/message.js";

export const get = async (req, res) => {
	try {
    const { limit, page, type, search } = req.query;
    const { role } = req.user;

    let status = 0;

    if(role.id === 1 || role.id === 2) {
      status = 0;
    };

    if(role.id === 3 || role.id === 4) {
      status = 1;
    };

    if(role.id === 5 || role.id === 6) {
      status = 2;
    };

    if(role.id === 7) {
      status = 3;
    };

    const { conversations } = await Conversation.get(limit, page, search, type, status);

		res.status(200).send({ message: 'ok', conversations });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
