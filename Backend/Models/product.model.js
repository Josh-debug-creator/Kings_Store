import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    image: {
      type: Array,
      required: [true, "image is required"],
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);
export default product;
// CVEfsigRYb5krxIt = password
// edwinjosh37 = username
