import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../types/roles";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const ACCESS_EXPIRES =
  process.env.JWT_ACCESS_EXPIRES_IN || "15m";

const REFRESH_EXPIRES =
  process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// ============================
// Generate Access Token
// ============================

export const generateAccessToken = (
  payload: JwtPayload
): string => {

  return jwt.sign(
    payload,
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_EXPIRES,
    } as SignOptions
  );
};

// ============================
// Verify Access Token
// ============================

export const verifyAccessToken = (
  token: string
): JwtPayload => {

  return jwt.verify(
    token,
    ACCESS_SECRET
  ) as JwtPayload;
};

// ============================
// Generate Refresh Token
// ============================

export const generateRefreshToken = (
  payload: JwtPayload
): string => {

  return jwt.sign(
    payload,
    REFRESH_SECRET,
    {
      expiresIn: REFRESH_EXPIRES,
    } as SignOptions
  );
};

// ============================
// Verify Refresh Token
// ============================

export const verifyRefreshToken = (
  token: string
): JwtPayload => {

  return jwt.verify(
    token,
    REFRESH_SECRET
  ) as JwtPayload;
};