import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  accountData: {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
});

export default mongoose.model("User", userSchema);
