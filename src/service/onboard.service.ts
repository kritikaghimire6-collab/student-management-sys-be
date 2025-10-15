import { User } from "../entities/user.entities";
import { convertCsvToJson } from "../utils/convertfile";
import { AppError } from "../utils/error";
import bcrypt from "bcrypt";

export const studentOnboardService = async (fileBuffer: Buffer) => {
  try {
    const inputData = convertCsvToJson(fileBuffer);
    const primaryEmailSet = new Set();
    const sanitizedData = [];

    console.log("Processing data:", inputData.length, "records");

    for (let index = 0; index < inputData.length; index++) {
      const each = inputData[index];

      const { Name, Email } = each;

      if (!Name) {
        throw new AppError("Name is missing in row " + (index + 1), 400);
      }
      if (!Email) {
        throw new AppError("Email is missing in row " + (index + 1), 400);
      }

      if (primaryEmailSet.has(Email)) {
        throw new AppError(
          `Duplicate primary Email ${Email} detected in row ${index + 1}.`,
          400
        );
      } else {
        primaryEmailSet.add(Email);
      }

      sanitizedData.push({
        name: Name.trim(),
        email: Email.trim().toLowerCase(),
      });
    }

    const users = [];

    for (const data of sanitizedData) {
      const hashedPassword = await bcrypt.hash(`${data.name}@123`, 10);
      const userData = User.create({
        ...data,
        password: hashedPassword,
        createdAt: new Date(),
      });
      users.push(userData);
    }
    await User.save(users);

    return {
      message: `Successfully onboarded ${sanitizedData.length} students`,
    };
  } catch (error) {
    throw error;
  }
};
