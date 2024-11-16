import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String, required: true },
  codeExpiresAt: { type: Date, required: true }
});

export default mongoose.model("TempUser", tempUserSchema);
