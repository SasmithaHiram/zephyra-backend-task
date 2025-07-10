import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });

    if (existing)
      return res.status(400).json({ message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(404).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Signin error", error });
  }
};

const protectedRoute = (req, res) => {
  res.status(200).json({ message: "Access to protected data granted" });
};

export { signup, signin, protectedRoute };
