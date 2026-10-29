import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../hooks/useAuth.js";

export default function Register() {
  const { acceptSession } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  async function handleSubmit(event) {
    event.preventDefault(); setError("");
    try { const { data } = await api.post("/auth/register", form); acceptSession(data); navigate("/dashboard"); }
    catch (err) { setError(err.response?.data?.message || "Unable to create account."); }
  }
  return <section className="panel stack"><h1>Create account</h1>
    <form className="form" onSubmit={handleSubmit}>
      <label>Username<input name="username" value={form.username} onChange={update} required autoComplete="username" /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" /></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={update} minLength="8" required autoComplete="new-password" /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn">Register</button>
    </form>
    <p>Already registered? <Link to="/login">Login</Link>.</p>
  </section>;
}