import mongoose from "mongoose";
import booksModel from "./book-schema";
import userModel from "./user-schema";

const runDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gevorgd999:gev199919@books-cluster.lhk6l.mongodb.net/?retryWrites=true&w=majority&appName=books-cluster"
    );
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1);
  }
};

export { runDb, booksModel, userModel };
