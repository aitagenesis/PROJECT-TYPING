import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Competition() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/typing/leaderboard").then(({ data }) => setScores(data.leaderboard || []))
    .catch(() => setError("The leaderboard is not available yet. Make sure the API and database are running.")); }, []);
  return <section className="panel stack"><h1>Competition leaderboard</h1>
    {error && <p>{error}</p>}
    {scores.length === 0 && !error ? <p>No scores have been recorded yet.</p> : null}
    {scores.length > 0 && <ol>{scores.map((score) => <li key={score._id}>{score.user?.username || "Player"} — {score.wpm} WPM, {score.accuracy}% accuracy</li>)}</ol>}
  </section>;
}