//dotenv
import * as dotenv from "dotenv";

//jwt
import jwt from "jsonwebtoken";

//connect
dotenv.config();
const SECRET = process.env.SECRET;

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const verified = jwt.verify(token, SECRET);
    req.verifiedUser = verified.user;
    next();
  } catch (error) {
    next();
  }
};
