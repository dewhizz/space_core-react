import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginComponent = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const iconLink = document.createElement("link");
    iconLink.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
    iconLink.rel = "stylesheet";
    document.head.appendChild(iconLink);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading('Logging in...');
    try {
      const data = { email, password };
      const res = await axios.post("https://space-core.onrender.com/user/Auth/", data);

      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setLoading('');

      if (user?.role === 'user') {
        navigate('/get-properties');
      } else if (user?.role === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/');
      }

      setError(res.data.message);
    } catch (error) {
      setLoading('');
      setError(error.message);
    }
  };

  const inputStyle = {
    borderRadius: '8px',
    padding: '12px 40px',
    fontSize: '16px',
  };

  const iconWrapperStyle = {
    position: 'relative',
    marginBottom: '20px',
  };

  const iconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#0dcaf0',
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card shadow p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "16px",
          backgroundColor: "#fff",
          border: "none",
        }}
      >
        <h1 className="text-center mb-2" style={{ color: "#2a5298", fontWeight: "700" }}>
          Space Core
        </h1>
        <h4 className="text-center mb-4" style={{ color: "#333", fontWeight: "600" }}>
          <i className="bi bi-box-arrow-in-right me-2"></i>Login
        </h4>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-circle-fill text-danger"></i>
            <span>{error}</span>
          </div>
        )}
        {loading && (
          <div className="alert alert-info d-flex align-items-center gap-2">
            <i className="bi bi-arrow-repeat text-primary"></i>
            <span>{loading}</span>
          </div>
        )}

        <div style={iconWrapperStyle}>
          <i className="bi bi-envelope" style={iconStyle}></i>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={iconWrapperStyle}>
          <i className="bi bi-lock" style={iconStyle}></i>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="d-grid mb-3">
          <button
            type="submit"
            className="btn"
            style={{
              background: "linear-gradient(to right, #0dcaf0, #2a5298)",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "16px",
              border: "none",
            }}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </div>

        <div className="text-center">
          <p className="mb-0">
            <i className="bi bi-person-plus me-2 text-muted"></i>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#0dcaf0", fontWeight: "500", textDecoration: "none" }}>
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;