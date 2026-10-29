import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function makeToken(user) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured.");
  return jwt.sign({ id: user._id.toString(), username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username?.trim() || !email?.trim() || !password || password.length < 8) {
      return res.status(400).json({ message: "Provide a username, email, and password of at least 8 characters." });
    }
    const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.trim() }] });
    if (exists) return res.status(409).json({ message: "That email or username is already registered." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username: username.trim(), email, passwordHash });
    return res.status(201).json({ token: makeToken(user), user: { id: user.id, username: user.username, email: user.email } });
  } catch {
    return res.status(500).json({ message: "Could not register this account." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase() }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    return res.json({ token: makeToken(user), user: { id: user.id, username: user.username, email: user.email } });
  } catch {
    return res.status(500).json({ message: "Could not log in." });
  }
}

// JWTs are stateless; clients should discard their token when logging out.
export function logout(_req, res) {
  return res.json({ message: "Logged out. Discard the token on the client." });
}