import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api/client";
import { AuthContext, type User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => api.getToken() !== null);

  useEffect(() => {
    const token = api.getToken();
    if (!token) return;
    api.get("/auth/me")
      .then((data) => {
        if (data.user) setUser({
          id: data.user.id,
          username: data.user.username,
          displayName: data.user.display_name || data.user.username,
          avatar: data.user.avatar,
        });
      })
      .catch(() => api.setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const data = await api.post("/auth/login", { username, password });
    api.setToken(data.token);
    setUser({
      id: data.user.id,
      username: data.user.username,
      displayName: data.user.displayName,
      avatar: data.user.avatar,
    });
  };

  const register = async (username: string, password: string, displayName?: string) => {
    const data = await api.post("/auth/register", { username, password, displayName });
    api.setToken(data.token);
    setUser({
      id: data.user.id,
      username: data.user.username,
      displayName: data.user.displayName,
      avatar: data.user.avatar,
    });
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
