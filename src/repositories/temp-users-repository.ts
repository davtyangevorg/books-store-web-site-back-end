import { TTempUser } from "../types/users";
import tempUserModel from "./db/temp-user-schema";

const tempUsersRepository = {
  createTempUser: async function (newTempUser: TTempUser) {
    try {
      const result = await tempUserModel.create(newTempUser);
      return result;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  getTempUserByEmail: async function (email: string) {
    try {
      const tempUser = await tempUserModel.findOne({ email });
      return tempUser;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  deleteTempUser: async function (email: string) {
    try {
      await tempUserModel.findOneAndDelete({ email });
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  },
};

export default tempUsersRepository;
