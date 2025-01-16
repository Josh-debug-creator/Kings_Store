import { v2 as cloudinary } from "cloudinary";
import configVariables from "../Config/config.js";

cloudinary.config({
  cloud_name: configVariables.CLOUD_NAME, // From environment variables
  api_key: configVariables.API_KEY, // From environment variables
  api_secret: configVariables.API_SECRET, // From environment variables
});


const uploadFile = async (filepath, folder = "") => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
      folder: folder,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload file to Cloudinary");
  }
};


export default uploadFile;
