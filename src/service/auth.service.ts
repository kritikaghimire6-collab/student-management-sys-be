import bcrypt from "bcrypt";
import {User} from "../entities/user.entities";
import {AppError} from "../utils/error";
import {generateAccessToken} from "../utils/generateToken";
import {getUserByEmail} from "./user.service";
import {OTP} from "../entities/otp.entities";
import {sendMail} from "../utils/mail";
import {generateOTP} from "../helper/auth.helper";

export const registerService = async (data: any) => {
  try {
    const {name, email, password, role} = data;

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    }).save();
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (data: {email: string; password: string}) => {
  try {
    const {email, password} = data;
    const user = await User.findOne({where: {email}});
    if (!user) {
      throw new AppError("User not found", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 400);
    }

    const accessToken = await generateAccessToken(
      user.id,
      user.email,
      user.role
    );

    return {accessToken};
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordService = async (email: string) => {
  const user = await User.findOne({where: {email}});
  if (!user) {
    throw new AppError("User Not Found", 400);
  }
  const otpCode = generateOTP().toString();

  const otp = OTP.create({
    otpCode,
    user: {id: user.id},
  });
  // Save OTP in the database
  await OTP.save(otp);

  const emailOptions = {
    email: user.email,
    subject: "Reset your password",
    message: `Hello ${user.name}, OTP to reset your password  is: ${otpCode}, This code is confidential and is valid for 20 minutes.`,
  };

  // Send a password reset email to the user
  await sendMail(emailOptions);

  return null;
};

export const resetPasswordService = async (body: any): Promise<void> => {
  const {email, otpCode, newPassword} = body;

  // Find the user by email
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError("User Not Found", 400);
  }

  const otp = await OTP.findOne({
    where: {user: {id: user.id}},
    order: {createdAt: "DESC"},
  });

  if (!otp) throw new AppError("Invalid or expired OTP", 400);

  const otpCreatedTime = otp.createdAt;
  const otpExpirationTime = new Date(otpCreatedTime.getTime() + 20 * 60 * 1000);
  const currentTime = new Date();

  if (!otp || otp.otpCode !== otpCode || currentTime > otpExpirationTime) {
    throw new AppError("Invalid or expired OTP", 400);
  }

  // Hash and update the user's password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
