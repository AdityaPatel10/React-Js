import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;  // You can replace `any` with a more specific type if needed
    }
  }
}

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const auth = req.headers["authorization"];

  if (!auth) {
    res.status(403).json({ message: "Unauthorized, JWT token is required" });
    return;
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
      return;
  }
};

export default ensureAuthenticated;
