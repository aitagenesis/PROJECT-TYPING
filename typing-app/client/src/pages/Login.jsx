import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(event) {
    event.preventDefault(); setError("");
    try { await login(email, password); navigate("/dashboard"); }
    catch (err) { setError(err.message || "Unable to sign in."); }
  }
  return <section className="panel stack"><h1>Login</h1>
    <form className="form" onSubmit={handleSubmit}>
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn">Login</button>
    </form>
    <p>New here? <Link to="/register">Create an account</Link>.</p>
  </section>;
}