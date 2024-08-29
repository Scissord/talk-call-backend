import * as Customer from "../models/customer.js";
import * as PivotUserCustomer from "../models/pivot_user_customer.js";

const phones = [
  { phone: '4444', access: 'buyer' },
  { phone: '5555', access: 'all' }
];

export const create = async (req, res) => {
  try {
    const { orderId, phone } = req.body;
    const isCameFromLeadVertex = phones.some((p) => p.phone === phone);

    if (!isCameFromLeadVertex) {
      return res.status(400).send({ message: 'Вас нет в базе для доступа к добавлению.' })
    };

    const customer = await Customer.create({

    });

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create customer controller", err.message);
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

    let customers = [];

    console.log(type, typeof type)

    type === 1
      ? customers = await Customer.getFavorites(limit, page, search, status, req.user.id)
      : customers = await Customer.get(limit, page, search, status);

		res.status(200).send({ message: 'ok', customers });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const toggleFavorite = async (req, res) => {
	try {
    const customer_id = req.params.customer_id;

    const check = await PivotUserCustomer.find(req.user, customer_id)
    if(check) {
      await PivotUserCustomer.destroy(req.user, customer_id);
    } else {
      await PivotUserCustomer.create({ user_id: req.user, customer_id });
    };

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in get customer controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
