import * as Customer from "../models/customer.js";
import formatDate from "../helpers/formatDate.js";

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { id, role } = req.user;

    const customers = await Customer.get(limit, page, search, role.status, id);

    for (const customer of customers) {
      customer.time = customer.last_message_date ? formatDate(customer.last_message_date) : "";
      customer.name = customer.name || "";
      customer.avatar = customer.avatar || "";
      customer.counter = Number(customer.counter);
      customer.manager_name = customer.manager_name || "";
      customer.last_message_text = customer.last_message_text || "";
      customer.status = Number(customer.status);
    };

		res.status(200).send({ message: 'ok', customers });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
