import express from "express";
import Package from "../models/Package.js";
import { makeCrudController } from "../controllers/genericController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();
const c = makeCrudController(Package);

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", protect, adminOnly, c.create);
router.put("/:id", protect, adminOnly, c.update);
router.delete("/:id", protect, adminOnly, c.remove);

export default router;
