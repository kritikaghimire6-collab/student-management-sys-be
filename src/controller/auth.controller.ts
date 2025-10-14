import { NextFunction, Request, Response } from "express";
import { registerService } from "../service/auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    await registerService({ name, email, password, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
