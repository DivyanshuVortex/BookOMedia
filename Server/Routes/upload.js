import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";
import Book from "../models/book.model.js";

const router = express.Router();

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bookomedia_pdfs",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bookomedia_thumbnails",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Use a single multer instance with .fields()
const upload = multer({
  storage: multer.diskStorage({}),
});

router.post(
  "/",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const pdfFile = req.files["pdf"]?.[0];
      const thumbnailFile = req.files["thumbnail"]?.[0];

      if (!pdfFile || !thumbnailFile) {
        return res.status(400).json({ error: "Missing PDF or thumbnail file" });
      }

      const pdfUpload = await cloudinary.uploader.upload(pdfFile.path, {
        folder: "bookomedia_pdfs",
        resource_type: "raw",
      });

      const thumbnailUpload = await cloudinary.uploader.upload(thumbnailFile.path, {
        folder: "bookomedia_thumbnails",
        resource_type: "image",
      });

      const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        pdfUrl: pdfUpload.secure_url,
        thumbnailUrl: thumbnailUpload.secure_url,
      });

      await newBook.save();

      res.json({
        success: true,
        pdfUrl: pdfUpload.secure_url,
        thumbnailUrl: thumbnailUpload.secure_url,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      res.status(500).json({ error: "Upload failed", details: err.message });
    }
  }
);

export default router;
