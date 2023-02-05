//dotenv
import * as dotenv from "dotenv";

//Mongoose
import mongoose from "mongoose";

//connect
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGODB_URI);
    console.info(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
