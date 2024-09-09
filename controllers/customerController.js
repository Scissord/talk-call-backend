import * as Customer from "../models/customer.js";

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { role } = req.user;

    const customers = await Customer.get(limit, page, search, role.status);

		res.status(200).send({ message: 'ok', customers });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
