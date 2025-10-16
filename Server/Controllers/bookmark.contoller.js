import User from "../models/user.model.js";
import Book from "../models/book.model.js"; 


export const bookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("booksId");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Separate MongoDB IDs vs Google Books IDs
    const mongoBookIds = user.booksId.filter(id => id.match(/^[0-9a-fA-F]{24}$/));
    const googleBookIds = user.booksId.filter(id => !id.match(/^[0-9a-fA-F]{24}$/));

    // Fetch MongoDB books
    const mongoBooks = await Book.find({ _id: { $in: mongoBookIds } });

    res.status(200).json({
      bookmarks: {
        mongoBooks,
        googleBooks: googleBookIds
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookmarks", error: err.message });
  }
};

// POST add bookmark
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

    res.status(200).json({
      message: "Book added to bookmarks",
      booksId: user.booksId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding bookmark", error: error.message });
  }
};
