import { createContext } from "react";

export type User = {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
};

export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, displayName?: string) => Promise<void>;
  demoLogin: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  demoLogin: () => {},
  logout: () => {},
});
