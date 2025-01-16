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



// - Reset Password
// — URL: `/user/api/reset`
// — Method: POST
// — Description: Allows users to reset their password.
// — Request Body:
// — `email` (string, required): User’s registered email address.
// — `password` (string, required): New password.
// — Response:
// — `message`: Password reset success message.

// - Forgot Password
// — URL: `/user/api/forgotPassword`
// — Method: POST
// — Description: Allows users to request a password reset link via email.
// — Request Body:
// — `email` (string, required): User’s registered email address.
// — Response:
// — `message`: Password reset link sent successfully message.