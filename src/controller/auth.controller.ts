import {NextFunction, Request, Response} from "express";
import {
  forgetPasswordService,
  loginService,
  registerService,
  resetPasswordService,
} from "../service/auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {name, email, password, role} = req.body;

    await registerService({name, email, password, role});
    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email, password} = req.body;

    const data = await loginService({email, password});
    res.status(200).json({message: "User login successfully", data: data});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const forgetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email} = req.body;

    console.log({email});

    await forgetPasswordService(email);

    res.status(200).json({message: "Email sent successfully", data: null});
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function for resetting user password, once he proceed with forget password option
 */
export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email, otpCode, newPassword} = req.body;

    await resetPasswordService({
      email,
      otpCode,
      newPassword,
    });

    res.status(200).json({message: "Password Reset  successfully", data: null});
  } catch (error) {
    next(error);
  }
};
