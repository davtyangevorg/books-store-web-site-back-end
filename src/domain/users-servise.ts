import usersRepository from "../repositories/users-repository";
import { TUser } from "../types/users";

const usersService = {
  getUserById: async (id: string) => {
    const user = await usersRepository.getUserById(id);
    if (!user || !user.accountData) {
      return null;
    }
    return {
      id: user._id.toString(),
      name: user.accountData.username,
      email: user.accountData.email,
    };
  },
  createUser: async function (
    username: string,
    passwordHash: string,
    email: string
  ) {
    const newUser: TUser = {
      accountData: {
        username,
        passwordHash,
        email,
      },
    };

    try {
      const user = await usersRepository.createUser(newUser);
      return user;
    } catch (error) {
      throw new Error("Failed to create user " + error);
    }
  },
};

export default usersService;
