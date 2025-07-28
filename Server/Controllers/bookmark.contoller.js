import User from "../models/user.model.js";

export const bookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("booksId");
    res.status(200).json({ bookmarks: user.booksId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching bookmarks", error: err.message });
  }
};

export const bookmarksadd = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const bookIdToAdd = req.body.bookId;
    if (!bookIdToAdd) {
      return res.status(400).json({ message: "bookId is required" });
    }

    // Avoid duplicates
    if (!user.booksId.includes(bookIdToAdd)) {
      user.booksId.push(bookIdToAdd);
      await user.save();
    }

    res.status(200).json({ message: "Book added to bookmarks", booksId: user.booksId });
  } catch (error) {
    console.log("bookmark controller error:", error);
    res.status(500).json({ message: "Error adding bookmark", error: error.message });
  }
};

