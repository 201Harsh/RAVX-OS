const mongoose = require("mongoose");

const ArcLabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unqique: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ArcLab = mongoose.model("ArcLab", ArcLabSchema);

module.exports = ArcLab;
