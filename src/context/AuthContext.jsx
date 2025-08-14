import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  const socketRef = useRef(null);

  // Logout function
  const logout = useCallback(() => {
    localStorage.clear();
    setToken("");
    setUser(null);

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

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

  // Connect socket when user is available
  useEffect(() => {
    if (user?.userId && !socketRef.current) {
      socketRef.current = io("https://space-core.onrender.com", {
        query: { userId: user.userId },
        transports: ["websocket"],
      });

      socketRef.current.emit("joinRoom", user.userId);

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        logout,
        socket: socketRef.current,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};