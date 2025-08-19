import express from "express";
import { signup, signin, profile } from "../Controllers/auth.contoller.js";
import { bookmarks, bookmarksadd } from "../Controllers/bookmark.contoller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { suggestion } from "../Controllers/suggestion.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/profile", verifyToken, profile);
router.get("/bookmarks", verifyToken, bookmarks);
router.post("/bookmarks", verifyToken, bookmarksadd);
router.post("/suggestions", suggestion);
export default router;
