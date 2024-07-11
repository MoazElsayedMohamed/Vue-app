import { UnauthenticatedError } from "../errors/CustomErrors";
import { VerifyJWT } from "../utils/tokenUtils";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = VerifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {}
};
