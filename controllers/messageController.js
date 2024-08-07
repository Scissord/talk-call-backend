import * as Message from "../models/message.js";

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
    const conversation_id = req.params.conversation_id
    console.log('here');

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
