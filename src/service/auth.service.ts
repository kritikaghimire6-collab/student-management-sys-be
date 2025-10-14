import bcrypt from "bcrypt";
import { User } from "../entities/user.entities";

export const registerService = async (data: any) => {
  try {
    const { name, email, password, role } = data;

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
