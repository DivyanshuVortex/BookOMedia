import axios from "axios";
import dotenv from "dotenv";
import Book from "../models/book.model.js";

dotenv.config();
export async function googleBooks(params) {
  try {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
      params: {
        q: params,
        filter: "partial",
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
}
export async function Readgooglebook(bookId) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`,
      {
        params: {
          key: process.env.GOOGLE_BOOKS_API_KEY,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching book:", error.message);
    throw error;
  }
}

export async function mongoBook(bookTitle) {
  try {
    const books = await Book.find({
      title: { $regex: bookTitle, $options: "i" },
    });
    return books;
  } catch (error) {
    console.error("Error fetching book from MongoDB:", error.message);
    throw error;
  }
}
