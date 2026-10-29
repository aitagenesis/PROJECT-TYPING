import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    wpm: { type: Number, required: true, min: 0 },
    accuracy: { type: Number, required: true, min: 0, max: 100 },
    durationSeconds: { type: Number, default: 0, min: 0 },
    mode: { type: String, enum: ["dimmed", "moving", "block", "normal"], default: "normal" }
  },
  { timestamps: true }
);

export default mongoose.models.Score || mongoose.model("Score", scoreSchema);