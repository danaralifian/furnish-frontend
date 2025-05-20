"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/features/user/context/user-context";
import { AuthService } from "../api/auth-service";

export function useAuth() {
  const { user, logout: userLogout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Check if user exists in context
        if (user) {
          // Store a token in localStorage to persist authentication
          localStorage.setItem("token", "authenticated");
          setIsAuthenticated(true);
        } else {
          const token = localStorage.getItem("token");
          setIsAuthenticated(!!token);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await AuthService.signIn(email, password);
      console.log(res);
      if (res) {
        localStorage.setItem("token", "authenticated");
        setIsAuthenticated(true);
      }
      return !!res.data;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await AuthService.signUp(email, password);
      if (res) {
        localStorage.setItem("token", "authenticated");
        setIsAuthenticated(true);
      }
      return !!res;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    userLogout();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
