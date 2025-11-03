const mongoose = require("mongoose");

const AIAIgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  voice: {
    type: String,
    required: true,
    trim: true,
  },
  personality: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tone: {
    type: String,
    required: true,
    trim: true,
  },
  Behaviors: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  SKills: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  UserId: {
    type: String,
    required: true,
  },
  ArcLabId: {
    type: String,
    required: true,
  },
  LastUsed: {
    type: Date,
    default: Date.now,
  },
});
