import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { googleBooks, Readgooglebook } from "./api/googleBook.js";
import routeauth from "./Routes/route.auth.js";
import mongoConnect from "./config/mongoConnect.js";
import upload from "./Routes/upload.js";
import mongoose from "mongoose";
import { mongoBook , Readmongobook } from "./api/googleBook.js";
import Book from "./models/book.model.js";

dotenv.config();
mongoConnect();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://book-o-media.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/user", routeauth);
app.use("/api/upload", upload);

app.get("/search", async (req, res) => {
  const query = req.query?.title || "Hobby";
  
  try {
    console.log("🔍 Searching for:", query);

    // Fetch both sources
    const respGoogle = await googleBooks(query);
    const respMongo = await mongoBook(query) || [];

    console.log("📘 MongoDB Books:", respMongo);
    console.log("📗 Raw Google Response:", respGoogle);

    const googleItems = respGoogle?.data?.items || [];

    const formattedGoogleBooks = googleItems.map((item) => {
      const info = item.volumeInfo || {};
      return {
        id: item.id,
        title: info.title || "Untitled",
        authors: info.authors || ["Unknown"],
        description: info.description || "No description available",
        thumbnail: info.imageLinks?.thumbnail || "",
        previewLink: info.previewLink || "",
        infoLink: info.infoLink || "",
        pageCount: info.pageCount || 0,
        categories: info.categories || [],
        publishedDate: info.publishedDate || "Unknown",
        language: info.language || "N/A",
        source: "Google",
      };
    });

    // 🧩 Normalize MongoDB book fields
    const formattedMongoBooks = respMongo.map((book) => ({
      id: book._id,
      title: book.title,
      authors: book.authors,
      description: book.description,
      thumbnail: book.thumbnailUrl || "", // ✅ renamed for frontend
      previewLink: book.pdfUrl || "",
      infoLink: "",
      pageCount: 0,
      categories: [],
      publishedDate: "",
      language: "N/A",
      source: "Database",
    }));

    // Combine both
    const allBooks = [...formattedMongoBooks, ...formattedGoogleBooks];

    console.log("📚 Final Combined Books Count:", allBooks.length);
    console.log("🖼️ Sample thumbnail:", allBooks[0]?.thumbnail);

    res.json(allBooks);
  } catch (error) {
    console.error("❌ Error in /search route:", error.message);
    console.error("🪲 Stack trace:", error.stack);
    res.status(500).json({ error: "Failed to fetch books data" });
  }
});


app.get("/book/:bookId", async (req, res) => {
  const bookId = req.params?.bookId;
  console.log("📗 Incoming request for bookId:", bookId);

  try {
    let response = null;

    // 1️⃣ Check if it's a MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(bookId)) {
      console.log("🔹 bookId is a valid MongoDB ObjectId, querying MongoDB...");
      const result = await Readmongobook(bookId);

      if (!result?.data) {
        console.log("❌ Book not found in MongoDB");
        return res.status(404).json({ error: "Book not found in MongoDB" });
      }

      const book = result.data;
      console.log("📦 Mongo response (actual book):", book);

      // Normalize MongoDB book to Google-like structure
      const mongoInfo = {
        id: book.id?.toString() || book._id?.toString(),
        volumeInfo: {
          title: book.volumeInfo?.title || "Untitled",
          authors: book.volumeInfo?.authors || ["Unknown"],
          description: book.volumeInfo?.description || "No description available",
          imageLinks: { smallThumbnail: book.volumeInfo?.imageLinks?.smallThumbnail || "" },
          previewLink: book.volumeInfo?.previewLink || "",
          infoLink: book.volumeInfo?.infoLink || "",
          pageCount: book.volumeInfo?.pageCount || 0,
          categories: book.volumeInfo?.categories || [],
          publishedDate: book.volumeInfo?.publishedDate || "Unknown",
          language: book.volumeInfo?.language || "en",
        },
      };

      console.log("📘 Sending MongoDB book in Google-like format:", mongoInfo);
      return res.json({
        id: mongoInfo.id,
        title: mongoInfo.volumeInfo.title,
        authors: mongoInfo.volumeInfo.authors,
        description: mongoInfo.volumeInfo.description,
        thumbnail: mongoInfo.volumeInfo.imageLinks.smallThumbnail,
        previewLink: mongoInfo.volumeInfo.previewLink,
        infoLink: mongoInfo.volumeInfo.infoLink,
        pageCount: mongoInfo.volumeInfo.pageCount,
        categories: mongoInfo.volumeInfo.categories,
        publishedDate: mongoInfo.volumeInfo.publishedDate,
        language: mongoInfo.volumeInfo.language,
      });
    }

    // 2️⃣ Otherwise, treat as Google Books ID
    console.log("🌍 bookId is NOT a MongoDB ID, querying Google Books API...");
    response = await Readgooglebook(bookId);

    if (!response?.data) {
      console.log("❌ Book not found in Google Books API");
      return res.status(404).json({ error: "Book not found in Google Books API" });
    }

    const info = response.data.volumeInfo;
    console.log("📘 Google volumeInfo found:", !!info);

    if (!info) {
      console.log("❌ Book missing volumeInfo in Google API");
      return res.status(404).json({ error: "Book volumeInfo not found in Google API" });
    }

    console.log("📘 Sending Google API book:", response.data.id);
    res.json({
      id: response.data.id,
      title: info.title || "Untitled",
      authors: info.authors || ["Unknown"],
      description: info.description || "No description available",
      thumbnail: info.imageLinks?.smallThumbnail || "",
      previewLink: info.previewLink || "",
      infoLink: info.infoLink || "",
      pageCount: info.pageCount || 0,
      categories: info.categories || [],
      publishedDate: info.publishedDate || "Unknown",
      language: info.language || "en",
    });
  } catch (error) {
    console.error("🔥 Error fetching book:", error);
    res.status(500).json({
      error: "Failed to fetch book",
      details: error.message,
    });
  }
});

app.get("/bookreads/:bookId", async (req, res) => {
  const { bookId } = req.params;
  console.log("📗 Incoming request for bookId:", bookId);

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    // Find book in MongoDB
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Return book info
    res.json({
      id: book._id.toString(),
      title: book.title,
      authors: book.authors,
      description: book.description,
      pdfUrl: book.pdfUrl, // ✅ for embedding in frontend
      thumbnailUrl: book.thumbnailUrl,
    });
  } catch (error) {
    console.error("🔥 Error fetching book:", error);
    res.status(500).json({ error: "Failed to fetch book", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
