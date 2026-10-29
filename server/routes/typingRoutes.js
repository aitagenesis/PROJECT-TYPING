import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getLeaderboard, saveResult } from "../controllers/typingController.js";

const router = Router();
router.post("/results", authMiddleware, saveResult);
router.get("/leaderboard", getLeaderboard);
export default router;