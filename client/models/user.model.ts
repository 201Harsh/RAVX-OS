import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.JWT = function () {
  return jwt.sign({ id: this._id }, <string>process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

export default User;
