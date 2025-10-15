import {randomInt} from "crypto";

export const generateOTP = (): number => {
  return randomInt(100000, 999999);
};
