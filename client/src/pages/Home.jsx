import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="panel stack">
      <p><strong>BUILD YOUR TYPING SKILLS</strong></p>
      <h1>Type faster. Stay accurate.</h1>
      <p>Practise at your own pace, follow your progress, and prepare for friendly typing competitions.</p>
      <div><Link className="btn" to="/register">Get started</Link> <Link className="btn secondary" to="/login">Sign in</Link></div>
    </section>
  );
}