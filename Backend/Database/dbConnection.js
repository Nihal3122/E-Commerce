import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "E-Commerce",
    });
  } catch (error) {
    console.log("Error while connecting database");
  }
};
