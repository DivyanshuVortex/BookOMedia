import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  description: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  language: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
