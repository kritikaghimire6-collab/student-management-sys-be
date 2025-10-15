import {RoleEnum} from "./enum";
import {v4 as uuidv4} from "uuid";
import {sign} from "jsonwebtoken";
import env from "../config/env";

const accessSecret = env.JWT_SECRET as string;
export const generateAccessToken = async (
  userId: number,
  email: string,
  role: RoleEnum
) => {
  // Generate tokens
  const accessToken = sign(
    {
      userId,
      email,
      role,
    },
    accessSecret,
    {expiresIn: "7d"}
  );

  return accessToken;
};
