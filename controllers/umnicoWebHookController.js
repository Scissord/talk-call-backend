import axios from "axios";
import * as Customer from "../models/customer.js"

export const getIncomingMessages = async (req, res) => {
	try {
    console.log(req.body);
    let newUser;
    if(req.body.type === 'message.incoming') {
      console.log(req.body.name, req.body.user)
      // const data = {
      //   name: req.body.name,
      //   phone: req.body.phone
      // }

      // newUser = await Customer.create(data);
    }
		res.status(200).send({ newUser });
	}	catch (err) {
		console.log("Error in get product controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
