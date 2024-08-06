import * as Message from "../models/message.js";

export const get = async (req, res) => {
	try {
    const customer_id = req.params.customer_id
    const messages = await Message.getChat(customer_id);

		res.status(200).send({ message: 'ok', messages });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
