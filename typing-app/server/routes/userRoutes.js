import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, getStats } from "../controllers/userController.js";

const router = Router();
router.get("/profile", authMiddleware, getProfile);
router.get("/stats", authMiddleware, getStats);
export default router;