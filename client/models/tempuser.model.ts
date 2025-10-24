import mongoose from "mongoose";

const TempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TempUserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

const TempUserModel =
  mongoose.models.TempUser || mongoose.model("TempUser", TempUserSchema);

export default TempUserModel;
