import {NextFunction, Request, Response} from "express";
import {studentOnboardService} from "../service/onboard.service";

export const studentOnboardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file?.buffer;
    if (!file) throw new Error("File not found");
    const data = await studentOnboardService(file);
    res.status(200).json({message: "Student onboard successfully"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
