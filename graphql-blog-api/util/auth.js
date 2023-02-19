//dotenv
import * as dotenv from "dotenv";

//jwt
import jwt from "jsonwebtoken";

//connect
dotenv.config();
const SECRET = process.env.SECRET;

export const createJWTToken = (user) => {
  return jwt.sign({ user }, SECRET, {
    expiresIn: "1d",
  });
};
