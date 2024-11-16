import tempUsersRepository from "../repositories/temp-users-repository";
import { TTempUser } from "../types/users";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";

const tempUsersService = {
  createTempUser: async function (
    username: string,
    email: string,
    password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = randomInt(100000, 999999).toString();
    const codeExpiresAt = new Date(Date.now() + 3600000) as unknown as number; // Code valid for 1 hour

    const newTempUser: TTempUser = {
      username,
      email,
      password: hashedPassword,
      verificationCode,
      codeExpiresAt,
    };

    return tempUsersRepository.createTempUser(newTempUser);
  },

  //   verifyTempUser: async function (email: string, verificationCode: string) {
  //     const tempUser = await tempUsersRepository.getTempUserByEmail(email);

  //     if (!tempUser) {
  //       throw new Error("Temporary user not found");
  //     }

  //     if (tempUser.verificationCode !== verificationCode) {
  //       throw new Error("Invalid verification code");
  //     }

  //     if (tempUser.codeExpiresAt < new Date()) {
  //       throw new Error("Verification code has expired");
  //     }

  //     return tempUser;
  //   },

  //   deleteTempUser: async function (email: string) {
  //     await tempUsersRepository.deleteTempUser(email);
  //   },
};

export default tempUsersService;
