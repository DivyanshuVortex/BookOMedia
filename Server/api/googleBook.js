import mongoose from "mongoose";
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

export async function Readmongobook(bookId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid book ID");
    }

    const book = await Book.findById(bookId);
    if (!book) {
      console.log("No book found for this ID.");
      return null;
    }

    // ✅ Make MongoDB response look like Google Books response
    return {
      data: {
        id: book._id,
        volumeInfo: {
          title: book.title,
          authors: book.authors || [],
          description: book.description || "",
          imageLinks: { smallThumbnail: book.thumbnailUrl || "" },
          previewLink: book.pdfUrl || "",
          infoLink: book.pdfUrl || "",
          pageCount: book.pageCount || null,
          categories: book.categories || [],
          publishedDate: book.publishedDate || null,
          language: book.language || "en",
        },
      },
    };
  } catch (error) {
    console.error("Error fetching book from MongoDB:", error.message);
    throw error;
  }
}
