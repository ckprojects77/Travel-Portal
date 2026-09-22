import express from "express";
import { createBooking, myBookings, allBookings, updateBookingStatus, deleteBooking } from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/mine", protect, myBookings);
router.get("/", protect, adminOnly, allBookings);
router.put("/:id/status", protect, adminOnly, updateBookingStatus);
router.delete("/:id", protect, adminOnly, deleteBooking);

export default router;
