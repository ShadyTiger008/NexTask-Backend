import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const createUser = async (data) => {
  const { fullName, userName, email, password, picturePath, occupation } = data;

  if (!password) {
    throw new Error("Password is required.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    userName,
    email,
    password: passwordHash,
    picturePath,
    occupation
  });

  return await newUser.save();
};

const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect!");
  }

  const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d"
  });

  await User.findByIdAndUpdate(user._id, { token });

  // Convert to plain object and remove sensitive fields
  const userObj = user.toObject();
  delete userObj.password; // Removes password
  delete userObj.__v; // Removes Mongoose version key

  return { user: userObj };
};

export default { createUser, loginUser };
