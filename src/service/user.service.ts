import {User} from "../entities/user.entities";

export const getUserDetails = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({where: {email}});
  return user;
};
