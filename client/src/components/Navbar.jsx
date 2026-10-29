import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <Link to="/" aria-label="Typing App home"><strong>⌨ Typing App</strong></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>
        {user ? <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/competition">Competition</Link>
          <Link to="/profile">Profile</Link>
          <button className="btn secondary" onClick={logout}>Log out</button>
        </> : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
      </nav>
    </header>
  );
}