const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  LabTokens: {
    type: Number,
    default: 1,
  },
  AIAgentToken: {
    type: Number,
    default: 2,
  },
});

UserSchema.methods.JWT_GEN = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET,);
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
