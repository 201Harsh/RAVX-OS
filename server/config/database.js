const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = ConnectToDB;
