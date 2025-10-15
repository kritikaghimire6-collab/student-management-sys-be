import {Request, Response, NextFunction} from "express";
import {decode, verify, TokenExpiredError} from "jsonwebtoken";
import {AppError} from "../utils/error";
import {User} from "../entities/user.entities";
import {DecodedPayload} from "../interface/auth.interface";
import {IRequestWithUser} from "../interface/req.interface";
import env from "../config/env";

const accessSecret = env.JWT_SECRET as string;

export const requireSignIn = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return next(new AppError("Unauthenticated! Token not found", 401));
    }

    const decoded: any = decode(accessToken, {complete: true});
    if (!decoded?.payload) {
      return next(new AppError("Invalid token!", 401));
    }

    const payload = verify(accessToken, accessSecret) as DecodedPayload;
    if (!payload) {
      return next(new AppError("Invalid token!", 401));
    }

    const user = await User.createQueryBuilder("user")
      .select(["user.id", "user.name", "user.email", "user.role"])
      .where("user.email = :email", {email: payload.email})
      .getOne();

    if (!user) {
      return next(new AppError("Unauthenticated!", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError("Token expired!", 401));
    }
    return next(new AppError("Unauthenticated!", 401));
  }
};
