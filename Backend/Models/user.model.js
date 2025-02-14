import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add your name"],
    },

    email: {
      type: String,
      required: [true, "please add a valid email"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "please add a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "please add a valid password"],
      unique: true,
    },
  
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel



