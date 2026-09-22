import express from "express";
import { register, login, me, updateMe, toggleSavedDestination, verifyAdminSecret } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.put("/me", protect, updateMe);
router.post("/me/saved/:destinationId", protect, toggleSavedDestination);
router.post("/verify-admin-secret", protect, adminOnly, verifyAdminSecret);

export default router;
