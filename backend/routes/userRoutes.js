import express from "express";
import { listUsers, deleteUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, adminOnly, listUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
