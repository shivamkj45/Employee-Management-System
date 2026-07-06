import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import ApiError from "../utils/ApiError";

export const authorize = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You are not allowed to perform this action"
      );
    }

    next();
  };
};