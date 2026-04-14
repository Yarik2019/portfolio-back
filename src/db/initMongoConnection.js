import mongoose from "mongoose";
import { env } from '../utils/env.js';
export const initMongoConnection = async () => {
  try {
    const user = env('MONGO_USER');
    const password = env('MONGO_PASSWORD');
    const host = env('MONGO_HOST');
    const dbName = env('MONGO_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${host}/${dbName}`,
    );
    console.log("Mongo connection successfully established!");
  } catch (error) {
    console.log("Error while setting up mongo connection", error);
    throw error;
  }
};
