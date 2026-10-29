import Score from "../models/Score.js";
import User from "../models/User.js";

export async function getProfile(req, res) {
  const user = await User.findById(req.user.id).select("username email createdAt");
  if (!user) return res.status(404).json({ message: "User not found." });
  return res.json({ user });
}

export async function getStats(req, res) {
  const scores = await Score.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(100);
  const bestWpm = scores.reduce((best, item) => Math.max(best, item.wpm), 0);
  const averageAccuracy = scores.length
    ? scores.reduce((sum, item) => sum + item.accuracy, 0) / scores.length
    : 0;
  return res.json({ testsCompleted: scores.length, bestWpm, averageAccuracy, recentScores: scores.slice(0, 10) });
}