import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { googleBooks, Readgooglebook } from "./api/googleBook.js";
import routeauth from "./Routes/route.auth.js";
import mongoConnect from "./config/mongoConnect.js";
import upload from "./Routes/upload.js";
import { mongoBook } from "./api/googleBook.js";

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

  try {
    const response = await Readgooglebook(bookId);
    const info = response.data.volumeInfo;

    if (!info) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      id: response.data.id,
      title: info.title,
      authors: info.authors,
      description: info.description,
      thumbnail: info.imageLinks?.smallThumbnail,
      previewLink: info.previewLink,
      infoLink: info.infoLink,
      pageCount: info.pageCount,
      categories: info.categories,
      publishedDate: info.publishedDate,
      language: info.language,
    });
  } catch (error) {
    console.error("Error fetching book:", error.message);
    res.status(500).json({
      error: "Failed to fetch book",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
