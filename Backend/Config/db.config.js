import configVariables from "./config.js";
import mongoose from "mongoose";


const mongoDbConnection = async () => {
  try {
    const comm = await mongoose.connect(configVariables.MONGO_URL);
    console.log(`MONGODB connected: ${comm.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default mongoDbConnection;