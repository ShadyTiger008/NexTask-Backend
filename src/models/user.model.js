import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    userName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    occupation: String,
    picturePath: String,
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);