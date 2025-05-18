"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/features/user/context/user-context"

export function useAuth() {
  const { user, login: userLogin, register: userRegister, logout: userLogout } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        // Check if user exists in context
        if (user) {
          // Store a token in localStorage to persist authentication
          localStorage.setItem("token", "authenticated")
          setIsAuthenticated(true)
        } else {
          const token = localStorage.getItem("token")
          setIsAuthenticated(!!token)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const success = await userLogin(email, password)
      if (success) {
        localStorage.setItem("token", "authenticated")
        setIsAuthenticated(true)
      }
      return success
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const success = await userRegister(userData)
      if (success) {
        localStorage.setItem("token", "authenticated")
        setIsAuthenticated(true)
      }
      return success
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    userLogout()
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
