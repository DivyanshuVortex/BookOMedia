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

    const respGoogle = await googleBooks(query);
    const respMongo = await mongoBook(query) || [];

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
      thumbnail: book.thumbnailUrl || "",
      previewLink: book.pdfUrl || "",
      infoLink: "",
      pageCount: 0,
      categories: [],
      publishedDate: "",
      language: book.language || "N/A",
      source: "Database",
    }));

    // Combine both
    const allBooks = [...formattedMongoBooks, ...formattedGoogleBooks];

    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books data" });
  }
});


app.get("/book/:bookId", async (req, res) => {
  const bookId = req.params?.bookId;

  try {
    let response = null;

    if (mongoose.Types.ObjectId.isValid(bookId)) {
      const result = await Readmongobook(bookId);

      if (!result?.data) {
        return res.status(404).json({ error: "Book not found in MongoDB" });
      }

      const book = result.data;

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


    response = await Readgooglebook(bookId);

    if (!response?.data) {
    
      return res.status(404).json({ error: "Book not found in Google Books API" });
    }

    const info = response.data.volumeInfo;

    if (!info) {
      console.log("❌ Book missing volumeInfo in Google API");
      return res.status(404).json({ error: "Book volumeInfo not found in Google API" });
    }

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
