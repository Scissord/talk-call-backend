import jwt from 'jsonwebtoken';
import * as User from '../models/user.js';
import * as UserToken from '../models/user_token.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: "Unauthorized - No Token Provided" });

    const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    if(!decodedAccessToken) return res.status(400).send({ error: "Invalid Token" })

    const userToken = await UserToken.findById(decodedAccessToken.userId);

    if(accessToken === userToken.token) {
      const user = await User.findById(decodedAccessToken.userId);
      if (!user) return res.status(401).send({ error: "User not found" });

      req.user = user;
      next();
    } else {
      return res.status(401).send({ error: "Invalid Token" });
    }
  } catch (err) {
    console.log("Error in protectRoute controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default protectRoute;
