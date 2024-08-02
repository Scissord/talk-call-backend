import jwt from 'jsonwebtoken';
import * as User from '../models/user.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: "Unauthorized - No Token Provided" });

    const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // If token is expired, verify the refresh token
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).send({ error: "Unauthorized - No Refresh Token Provided" });

        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const user = await User.findById(decodedRefresh.userId);
        if (!user) return res.status(401).send({ error: "User not found" });

        const newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

        decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
        return res.status(401).send({ accessToken: newAccessToken });
      } else {
        return res.status(401).send({ error: "Unauthorized - Invalid Token" });
      }
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).send({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protectRoute controller", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export default protectRoute;
