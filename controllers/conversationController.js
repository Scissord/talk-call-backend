import * as Conversation from "../models/conversation.js";

export const create = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create conversation controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const get = async (req, res) => {
	try {
    const { limit, page, type, search } = req.query;
    const { role } = req.user;

    let status = 0;

    if(+role.id === 1 || +role.id === 2) {
      status = 0;
    };

    if(+role.id === 3 || +role.id === 4) {
      status = 1;
    };

    if(+role.id === 5 || +role.id === 6) {
      status = 2;
    };

    if(+role.id === 7) {
      status = 3;
    };

    const conversations = await Conversation.get(limit, page, search, type, status);

		res.status(200).send({ message: 'ok', conversations });
	}	catch (err) {
		console.log("Error in get conversation controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const toggleFavorite = async (req, res) => {
	try {
    const customer_id = req.params.customer_id;
    const isFavorite = req.body.isFavorite;

    await Conversation.updateByCustomerId(customer_id, { isFavorite: !isFavorite });

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get conversation controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
