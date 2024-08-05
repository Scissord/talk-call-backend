import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const generateToken = (userId) => {
  const token = jwt.sign({ userId, jti: uuidv4() }, process.env.JWT_SECRET);

  return token;
};

export default generateToken;
