import jwt from "jsonwebtoken";
import { TUserWithId } from "../types/users";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const jwtService = {
  createJWT: async (user: TUserWithId) => {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  },
  getUserIdFromJWT: async (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return (decoded as { id: string }).id;
  },
};
