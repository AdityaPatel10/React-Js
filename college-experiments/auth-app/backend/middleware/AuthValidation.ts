import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Register Validation Middleware
const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: " Request", error: error.details });
    return;
  }

  next();
};

// Login Validation Middleware
const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Bad Request", error: error.details });
    return;
  }

  next();
};

export { registerValidation, loginValidation };
