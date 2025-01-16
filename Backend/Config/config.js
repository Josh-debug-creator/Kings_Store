import dotenv from "dotenv";
dotenv.config("./env");

const configVariables = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_EMAIL:process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,
  PAYSTACK_SECRET_KEY:process.env.PAYSTACK_SECRET_KEY
};

export default configVariables;
