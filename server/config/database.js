const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
    });
  } catch (error) {
  }
};

module.exports = ConnectToDB;
