import { User } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  registerUser: (user: User) => void;
  setAuthenticated: (value: boolean) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const demoUser: User = {
  id: "demo-id",
  name: "Demo User",
  email: "demo@example.com",
  password: "password123",
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [demoUser],
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),

      registerUser: (newUser) => {
        const { users } = get();
        const exists = users.some((u) => u.email === newUser.email);
        if (!exists) set({ users: [...users, newUser] });
      },

      login: (email, password) => {
        const { users } = get();
        const found = users.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);
