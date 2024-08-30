import * as User from "../models/user.js";
import * as UserToken from "../models/user_token.js";
import generateToken from "../helpers/generateToken.js";

export const create = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = generateToken();

    await UserToken.create({
      user_id: user.id,
      token: token
    });

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const get = async (req, res) => {
	try {
    const users = await User.get();

		res.status(200).send({ message: 'ok', users });
	}	catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
