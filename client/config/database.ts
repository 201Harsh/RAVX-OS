import mongoose from "mongoose";

const MONGODB_URL = <string>process.env.MONGO_URL;

const ConnectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};

export default ConnectToDB;
