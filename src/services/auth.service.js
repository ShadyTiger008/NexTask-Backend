import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const createUser = async (data) => {
  const { fullName, userName, email, password, picturePath, occupation } = data;

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    userName,
    email,
    password: passwordHash,
    picturePath,
    occupation,
  });

  const savedUser = await newUser.save();

  return savedUser;
};

const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      message: "User does not exist!",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      message: "Password is incorrect!",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  delete user.password;

  return { token, user };
};

export default { createUser, loginUser };
