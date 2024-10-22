import bcrypt from 'bcryptjs';
import * as User from "../models/user.js";
import * as UserToken from "../models/user_token.js";
import * as Column from '../models/column.js';
import * as Customer from '../models/customer.js';
import * as Message from '../models/message.js';
import generateTokens from "../helpers/generateTokens.js";

export const create = async (req, res) => {
  try {
    const { name, password, role } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      password: hashedPassword,
      role
    });

    const { accessToken, refreshToken } = generateTokens(user.id);

    await UserToken.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    let position = null;
    let status = null;

    if(+role === 3 || +role === 5) {
      status = 1;
      const columns = await Column.get(1);
      if (columns.length > 0) {
        const lastPosition = columns[columns.length - 1].position;
        position = +lastPosition + 1;
      } else {
        position = 1;
      };
    };

    if(+role === 4 || +role === 6) {
      status = 2;
      const columns = await Column.get(2);
      if (columns.length > 0) {
        const lastPosition = columns[columns.length - 1].position;
        position = +lastPosition + 1;
      } else {
        position = 1;
      };
    };

    await Column.create({
      title: name,
      position,
      status,
      manager_id: user.id
    });

    return res.status(200).send({ message: 'ok' });
  }	catch (err) {
		console.log("Error in create user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const get = async (req, res) => {
	try {
    const { role } = req.user;
    const users = await User.get(role.id);

		res.status(200).send({ message: 'ok', users });
	}	catch (err) {
		console.log("Error in get user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const update = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { name, role } = req.body;

    await User.update(user_id, {
      name: name,
      role: role
    });

    await Column.updateByManagerId(user_id, {
      title: name
    });

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in update user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const destroy = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { role } = req.body;

    await Message.deleteManager(user_id);

    await User.destroy(user_id);
    await UserToken.destroy(user_id);

    await Customer.updateWhenDeleteManager(user_id, req.user.id);

    await Column.destroy(user_id);

		res.status(200).send({ message: 'ok' });
	}	catch (err) {
		console.log("Error in destroy user controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
