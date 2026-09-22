import express from "express";
import Destination from "../models/Destination.js";
import { makeCrudController } from "../controllers/genericController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();
const c = makeCrudController(Destination);

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);

export default router;
