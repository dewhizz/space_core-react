import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const { createContext, useCallback, useState, useEffect } = require("react");

<<<<<<< HEAD
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
=======
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
>>>>>>> 9816f66588c7f17e3f051f9a17dc7cfb6859dcab
  const navigate = useNavigate();
  //initialize states from local storage
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      return parsed ?? null; // Handles undefined explicitly
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

<<<<<<< HEAD

=======
>>>>>>> 9816f66588c7f17e3f051f9a17dc7cfb6859dcab
  //logout
  const logout = useCallback(() => {
    localStorage.clear();
    setToken("");
    setUser(null);
    navigate("/login");
  }, [navigate]);

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

  //return
  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
=======
    <AuthContext.Provider value={
        { 
            token, 
            setToken, 
            user, 
            setUser, 
            logout }}>
>>>>>>> 9816f66588c7f17e3f051f9a17dc7cfb6859dcab
      {children}
    </AuthContext.Provider>
  );
};
<<<<<<< HEAD
// export { AuthProvider, AuthContext };
=======
export { AuthProvider, AuthContext };
>>>>>>> 9816f66588c7f17e3f051f9a17dc7cfb6859dcab
