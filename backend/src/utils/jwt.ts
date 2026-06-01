import jwt, { JwtPayload } from "jsonwebtoken";
import { string } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "123456789";

export const generateToken = (userId: string) => {
  const payload = { userId: string };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
