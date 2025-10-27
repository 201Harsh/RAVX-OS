const mongoose = require("mongoose");
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

const TempUser = mongoose.model("TempUser", TempUserSchema);

module.exports = TempUser;
