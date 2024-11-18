import mongoose from "mongoose";
import booksModel from "./book-schema";
import userModel from "./user-schema";
import { config } from "../../config";

const runDb = async () => {
  try {
    await mongoose.connect(config.db.uri);
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

export { runDb, booksModel, userModel };
