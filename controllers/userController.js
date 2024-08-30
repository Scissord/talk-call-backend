import * as User from "../models/user.js";
import * as UserToken from "../models/user_token.js";
import generateToken from "../helpers/generateToken.js";

export const create = async (req, res) => {
  try {
    const { name, password, role } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword)

    const user = await User.create({
      name,
      password: hashedPassword,
      role
    });

    const token = generateToken();

    console.log(token)

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
