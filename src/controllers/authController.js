import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });

    if (existing)
      return res.status(400).json({ message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, hashed });
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error });
  }
};
