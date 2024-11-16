import { TUser } from "../types/users";
import userModel from "./db/user-schema";

const usersRepository = {
  createUser: async function (newUser: TUser) {
    try {
      const result = await userModel.create(newUser);
      return result;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  },
  getUserByUsernameOrEmail: async function (usernameOrEmail: string) {
    try {
      const user = await userModel.findOne({
        $or: [
          { "accountData.username": usernameOrEmail },
          { "accountData.email": usernameOrEmail },
        ],
      });
      return user;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  },
  // updateUser: async function (id: string, updateData: Partial<TUser>) {
  //   try {
  //     const result = await userModel.findByIdAndUpdate(
  //       id,
  //       { $set: updateData },
  //       { new: true }
  //     );
  //     return result;
  //   } catch (error) {
  //     throw error instanceof Error ? error : new Error(String(error));
  //   }
  // },
  // deleteUser: async function (id: string) {
  //   try {
  //     await userModel.findByIdAndDelete(id);
  //   } catch (error) {
  //     throw error instanceof Error ? error : new Error(String(error));
  //   }
  // },
  getUserById: async function (id: string) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  },
};

export default usersRepository;
