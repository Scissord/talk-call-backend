import axios from "axios";
import * as Message from "../models/message.js";
// import * as

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
    const lead_id = req.body.lead_id;

    // const customer = await Customer.findByConversationId(lead_id);
    // const conversation_id = req.params.conversation_id;
    // const files = req.body.files;

    // await axios({
    //   method: 'POST',
    //   url: `/v1.3/messaging/${lead_id}/send`,
    //   data: {
    //     message: {
    //       text: req.body.message,
    //       attachment: null,
    //       // attachment: files[0]
    //     }
    //     source:
    //   }
    // })


		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get message controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
