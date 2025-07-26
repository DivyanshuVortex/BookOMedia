import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    password = await bcrypt.hash(password, 10);

    // Create user first
    const user = await User.create({ name, email, password });

    // Sign JWT after user is created
    const Key = "scert_jey";
    const token = jwt.sign({ id: user._id }, Key);

    res.status(201).json({
      message: "User created ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during sign-up", error: err.message });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const Key = "scert_jey";
    const token = jwt.sign({ id: existingUser._id }, Key);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during sign-in", error: err.message });
  }
};

// PROFILE
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile fetched", user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};
