import * as Customer from "../models/customer.js";
import formatDate from "../helpers/formatDate.js";

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { id, role } = req.user;

    const customers = await Customer.get(limit, page, search, role.status, id);

    for (const customer of customers) {
      customer.time = formatDate(customer.last_message_date);

      customers[customer.id] = {
        id: customer.id,
        name: customer.name ? customer.name : "",
        avatar: customer.avatar ? customer.avatar : "",
        counter: +customer.counter,
        good: customer.good,
        order_id: customer.order_id,
        manager_name: customer.manager_name ? customer.manager_name : "",
        text: customer.text ? customer.text : "",
        time: customer.time ? customer.time : "",
        status: +customer.status,
      };
    };

		res.status(200).send({ message: 'ok', customers });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
