import React, { createContext, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return parsed ?? null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  // Logout function
  const logout = useCallback(() => {
    localStorage.clear();
    setToken("");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  // Auto logout if token expired
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
  }, [token, logout]);

  // Provide context
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};