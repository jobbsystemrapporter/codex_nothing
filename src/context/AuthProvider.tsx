import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api/client";
import { AuthContext, type User } from "./AuthContext";

const demoUser: User = {
  id: 1,
  username: "demo",
  displayName: "Demo",
  avatar: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = api.getToken();
    if (token === "demo-token") return demoUser;
    return null;
  });
  const [loading, setLoading] = useState(() => {
    const token = api.getToken();
    return token !== null && token !== "demo-token";
  });

  useEffect(() => {
    const token = api.getToken();
    if (!token || token === "demo-token") return;
    api.get("/auth/me")
      .then((data) => {
        if (data.user) setUser({
          id: data.user.id,
          username: data.user.username,
          displayName: data.user.display_name || data.user.username,
          avatar: data.user.avatar,
        });
      })
      .catch(() => {
        api.setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await api.post("/auth/login", { username, password });
      api.setToken(data.token);
      setUser({
        id: data.user.id,
        username: data.user.username,
        displayName: data.user.displayName,
        avatar: data.user.avatar,
      });
    } catch (err) {
      if (err instanceof Error && err.message.includes("fetch")) {
        throw new Error("Server unavailable. Try demo mode below.");
      }
      throw err;
    }
  };

  const register = async (username: string, password: string, displayName?: string) => {
    try {
      const data = await api.post("/auth/register", { username, password, displayName });
      api.setToken(data.token);
      setUser({
        id: data.user.id,
        username: data.user.username,
        displayName: data.user.displayName,
        avatar: data.user.avatar,
      });
    } catch (err) {
      if (err instanceof Error && err.message.includes("fetch")) {
        throw new Error("Server unavailable. Try demo mode below.");
      }
      throw err;
    }
  };

  const demoLogin = () => {
    api.setToken("demo-token");
    setUser(demoUser);
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
