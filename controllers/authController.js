import bcrypt from 'bcryptjs';
import * as User from "../models/user.js";
import * as UserToken from "../models/user_token.js";
import generateTokens from '../helpers/generateToken.js';

// export const signup = async (req, res) => {
// 	try {
// 		const { name, phone, password, confirmPassword, gender } = req.body;

// 		const user = await User.isExist(name, phone);

// 		// Should be in validate function (service)
// 		if (password !== confirmPassword) {
// 			return res.status(400).send({ error: "Passwords don't match" });
// 		}
// 		if (user) {
// 			return res.status(400).send({ error: "Username already exists" });
// 		}
// 		if (password.length < 6) {
// 			return res.status(400).send({ error: "Password must be at least 6 characters long" });
// 		}

// 		// HASH PASSWORD
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		// https://avatar-placeholder.iran.liara.run/
//     let avatar
//     if(gender === 0) {
//       avatar = `https://avatar-placeholder.iran.liara.run/public/boy?username=${name}`;
//     } else {
//       avatar = `https://avatar-placeholder.iran.liara.run/public/girl?username=${name}`;
//     }

//     const newUser = await User.create({
//       name,
//       phone,
//       password: hashedPassword,
//       gender,
// 			avatar
//     })

// 		if(newUser) {
// 			// generate JWT TOKEN
// 			const { accessToken, refreshToken } = generateTokens(newUser.id);

// 			// save refreshToken in DB
//       await UserToken.create({
//         user_id: newUser.id,
//         refresh_token: refreshToken,
//         expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
//       });

//       res.cookie("refreshToken", refreshToken, {
//         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
//         httpOnly: true, // Защищает от XSS атак
//         sameSite: "strict", // Защита от CSRF атак
//         secure: process.env.NODE_ENV === "production" // Только в производственной среде
//       });

// 			return res.status(201).send({
//         message: "Successfully created",
//         user: newUser,
//         accessToken
//       });
// 		} else {
// 			return res.status(400).send({ error: "Invalid user data" });
// 		}
// 	}	catch (err) {
// 		console.log("Error in post signup controller", err.message);
// 		res.status(500).send({ error: "Internal Server Error" });
// 	};
// };

export const getAuthRoutes = async (req, res) => {
  res.status(200).send({
    route1: 'router.get("", controller.getAuthRoutes)',
    route2: 'router.post("/login", controller.login)',
    route3: 'router.post("/logout", controller.logout);',
   });
};

export const login = async (req, res) => {
	try {
		const { name, phone, email, password } = req.body;
    console.log(req.body)

		const user = await User.findOne(name, phone, email);
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user) return res.status(400).send({ error: "This user does not exist" });
		if(!isPasswordCorrect) return res.status(400).send({ error: "Invalid password" });

    // generate JWT TOKEN
    const { accessToken, refreshToken } = generateTokens(user.id);

    // save refreshToken in DB
    await UserToken.update(user.id, {
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true, // Защищает от XSS атак
      sameSite: "strict", // Защита от CSRF атак
      secure: process.env.NODE_ENV === "production" // Только в производственной среде
    });

		res.status(200).send({ message: "Successfully login", user, accessToken });
	}	catch (err) {
		console.log("Error in login controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("refreshToken", "", { maxAge: 0 })

		res.status(200).send({ message: "Successfully logout" });
	}	catch (err) {
		console.log("Error in logout controller", err.message);
		res.status(500).send({ error: "Internal Server Error" });
	}
};
