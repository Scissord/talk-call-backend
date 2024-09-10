import * as Customer from "../models/customer.js";

export const get = async (req, res) => {
	try {
    const { limit, page, search } = req.query;
    const { id, role } = req.user;

    console.log(role)

    const { customers } = await Customer.get(limit, page, search, role.status, id);

		res.status(200).send({ message: 'ok', customers });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
