import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "",
  },
  db: {
    uri: process.env.MONGO_URI || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
  email: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "",
  },
};
