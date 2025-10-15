import {NextFunction, Request, Response} from "express";
import {getUserDetails} from "../service/user.service";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserDetails();

    res.status(200).json({message: "User fetch successfully", data: user});
  } catch (error) {
    next(error);
  }
};
