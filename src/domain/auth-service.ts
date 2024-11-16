import bcrypt from "bcrypt";

import usersRepository from "../repositories/users-repository";
import { TTempUser } from "../types/users";
import { randomInt } from "crypto";
import { emailAdapter } from "../adapters/email-adapter";
import tempUsersRepository from "../repositories/temp-users-repository";
import usersService from "./users-servise";

const authService = {
  createUser: async function (
    username: string,
    password: string,
    email: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit random verification code
    const verificationCode = randomInt(100000, 999999).toString();

    // Create a temporary user and save it
    const newUser: TTempUser = {
      username,
      email,
      password: hashedPassword,
      verificationCode,
      codeExpiresAt: Date.now() + 3600000, // Code valid for 1 hour
    };

    await tempUsersRepository.createTempUser(newUser);

    try {
      await emailAdapter.sendEmail(
        email,
        "Confirm your email",
        "Your verification code is: " + verificationCode
      );

      // Return success message
      return {
        email,
      };
    } catch (error) {
      // TODO: delete user from db
      // await usersRepository.deleteUser(result._id.toString());
      // throw new Error("Failed to send verification email");
    }
  },

  verifyEmail: async function (code: string, email: string) {
    const tempUser = await tempUsersRepository.getTempUserByEmail(email);
    if (!tempUser) {
      throw new Error("Invalid verification code or email");
    }

    //check code
    if (tempUser.verificationCode !== code) {
      throw new Error("Invalid verification code");
    }

    try {
      const newUser = await usersService.createUser(
        tempUser.username,
        tempUser.password,
        tempUser.email
      );
      await tempUsersRepository.deleteTempUser(email);

      return newUser;
    } catch (error) {
      await tempUsersRepository.deleteTempUser(email);
      throw new Error("Failed to create user " + error);
    }
  },
  checkCredentials: async function (usernameOrEmail: string, password: string) {
    const user = await usersRepository.getUserByUsernameOrEmail(
      usernameOrEmail
    );
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.accountData?.passwordHash || ""
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid password or email");
    }
    return user;
  },
};

export default authService;
