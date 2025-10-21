"use client"

import { useAuthStore } from "src/stores/authStore"

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  return {
    user,
    isAuthenticated,
    setUser,
    setAuthenticated,
    logout,
  }
}
