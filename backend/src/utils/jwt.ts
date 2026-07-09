import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../types/roles";

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}
const JWT_SECRET = process.env.JWT_SECRET!;

const JWT_EXPIRES_IN = "1d";
console.log("JWT_SECRET:", process.env.JWT_SECRET);
export const generateAccessToken = (
  payload: JwtPayload
): string => {

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const options: SignOptions = {
  expiresIn: JWT_EXPIRES_IN
};

return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.verify(token, secret) as JwtPayload;
};