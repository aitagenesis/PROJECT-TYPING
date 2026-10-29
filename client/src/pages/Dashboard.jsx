import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Dashboard() {
  const { user } = useAuth();
  return <section className="stack"><h1>Welcome{user?.username ? `, ${user.username}` : ""}!</h1>
    <p>Choose what you would like to do next.</p>
    <div className="link-grid">
      <article className="card"><h2>Practice</h2><p>Work on speed and accuracy.</p><Link to="/practice">Start practice →</Link></article>
      <article className="card"><h2>Competition</h2><p>View the leaderboard.</p><Link to="/competition">View competition →</Link></article>
      <article className="card"><h2>Profile</h2><p>Review your progress.</p><Link to="/profile">View profile →</Link></article>
    </div>
  </section>;
}