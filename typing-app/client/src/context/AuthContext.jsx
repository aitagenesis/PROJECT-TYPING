import { createContext, useCallback, useMemo, useState } from "react";
import api from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("typing-user") || "null"); }
    catch { return null; }
  });
  const [loading] = useState(false);

  const acceptSession = useCallback(({ token, user: nextUser }) => {
    if (token) localStorage.setItem("typing-token", token);
    if (nextUser) localStorage.setItem("typing-user", JSON.stringify(nextUser));
    setUser(nextUser || null);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    acceptSession(data);
  }, [acceptSession]);

  const logout = useCallback(() => {
    localStorage.removeItem("typing-token");
    localStorage.removeItem("typing-user");
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout, acceptSession }), [user, loading, login, logout, acceptSession]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}