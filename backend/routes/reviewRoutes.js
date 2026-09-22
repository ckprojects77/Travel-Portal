import express from "express";
import { listReviews, createReview, deleteReview } from "../controllers/reviewController.js";
import { protect, adminOnly, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", listReviews);
router.post("/", optionalAuth, createReview);
router.delete("/:id", protect, adminOnly, deleteReview);

export default router;
