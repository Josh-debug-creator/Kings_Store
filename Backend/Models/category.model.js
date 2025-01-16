import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true, // Optional: Ensure name uniqueness at the database level
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

const category = mongoose.model("Category", categorySchema);
export default category;
