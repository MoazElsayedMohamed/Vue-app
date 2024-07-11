import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomErrors.js";
import { VerifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = VerifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!req.body.role) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
