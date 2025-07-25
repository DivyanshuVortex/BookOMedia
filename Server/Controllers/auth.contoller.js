import User from '../models/user.model.js';

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Error during sign-up', error: err.message });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user: existingUser });
  } catch (err) {
    res.status(500).json({ message: 'Error during sign-in', error: err.message });
  }
};
