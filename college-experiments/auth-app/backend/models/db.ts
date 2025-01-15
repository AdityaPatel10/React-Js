import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

type MongoError = {
  message: string;
};

const mongoUrl: string | undefined = process.env.MONGO_CONN || "";

if (!mongoUrl) {
  throw new Error("MONGO_CONN is not defined in the environment variables");
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: MongoError) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
