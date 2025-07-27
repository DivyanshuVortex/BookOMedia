import User from '../models/user.model.js';

export const bookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("booksId");
    res.status(200).json({ bookmarks: user.booksId });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookmarks", error: err.message });
  }
};
