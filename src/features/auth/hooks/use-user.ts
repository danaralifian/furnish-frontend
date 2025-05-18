"use client"

import { useState, useEffect } from "react"

export function useUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in (e.g., by checking for a token in localStorage)
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const login = () => {
    // Implement login logic (e.g., store a token in localStorage)
    localStorage.setItem("token", "dummy_token")
    setIsLoggedIn(true)
  }

  const logout = () => {
    // Implement logout logic (e.g., remove the token from localStorage)
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
}
