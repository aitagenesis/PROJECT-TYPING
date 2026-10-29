import Score from "../models/Score.js";

export async function saveResult(req, res) {
  const { wpm, accuracy, durationSeconds = 0, mode = "normal" } = req.body;
  if (![wpm, accuracy, durationSeconds].every((value) => Number.isFinite(Number(value))) ||
      Number(wpm) < 0 || Number(accuracy) < 0 || Number(accuracy) > 100) {
    return res.status(400).json({ message: "Enter valid WPM, accuracy, and duration values." });
  }
  const score = await Score.create({
    user: req.user.id,
    wpm: Number(wpm),
    accuracy: Number(accuracy),
    durationSeconds: Number(durationSeconds),
    mode
  });
  return res.status(201).json({ score });
}

export async function getLeaderboard(_req, res) {
  const scores = await Score.find()
    .sort({ wpm: -1, accuracy: -1 })
    .limit(20)
    .populate("user", "username")
    .select("wpm accuracy mode createdAt user");
  return res.json({ leaderboard: scores });
}