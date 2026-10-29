import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.js";

export default function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/user/stats").then(({ data }) => setStats(data))
    .catch(() => setError("Could not load statistics yet.")); }, []);
  return <section className="stack"><h1>Your profile</h1>
    <article className="panel"><p><strong>Username:</strong> {user?.username || "Typing learner"}</p><p><strong>Email:</strong> {user?.email || "Not loaded"}</p></article>
    <article className="panel"><h2>Performance</h2>{error && <p>{error}</p>}
      {stats ? <div className="metric-grid"><p>Tests completed: <strong>{stats.testsCompleted}</strong></p><p>Best speed: <strong>{stats.bestWpm} WPM</strong></p><p>Average accuracy: <strong>{Math.round(stats.averageAccuracy)}%</strong></p></div> : <p>Statistics will appear after your first saved test.</p>}
    </article>
  </section>;
}