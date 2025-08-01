import axios from 'axios';
import express from 'express';
import cors from 'cors'
import { googleBooks,Readgooglebook } from './api/googleBook.js';
import routeauth from './Routes/route.auth.js';
import dotenv from 'dotenv';
import mongoConnect from './config/mongoConnect.js';
dotenv.config();


mongoConnect();


const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://bookomedia-fe.onrender.com" , "http://localhost:5173/"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/user' , routeauth) ;



app.get('/search', async (req, res) => {
    const query = req.query?.title || 'Hobby';
    try {
        const resp = await googleBooks(query);
        const books = resp.data.items.map(item => {
            const info = item.volumeInfo;
            return {
                id : item.id,// top level then others
                title: info.title,
                authors: info.authors,
                description: info.description,
                thumbnail: info.imageLinks?.thumbnail,
                previewLink: info.previewLink,
                infoLink: info.infoLink,
                pageCount: info.pageCount,
                categories: info.categories,
                publishedDate: info.publishedDate,
                language: info.language
            };
        });
        res.json(books);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: 'Failed(google books) to fetch data' });
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
  console.log(`Server started on port ${PORT}`);
});
