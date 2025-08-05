import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginComponent = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading('Logging in...');
    try {
      const data = { email, password }
      const res = await axios.post(
        "https://space-core.onrender.com/user/Auth/",
        data
      );
      console.log(res.data)

      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setLoading('')
      if (res.data.user) {
        if (res.data.user.role === 'user') {
          console.log('/user-dashboard')
          navigate('/user-dashboard')
        // } if (res.data.user.role === 'owner') {
        //   console.log('/owner-dashboard')
        //   navigate('/owner-dashboard')
        }

      } else {
        navigate('/')
      }

      setError(res.data.message)
    } catch (error) {
      setLoading('');
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <form
        onSubmit={handleSubmit}
        className="card shadow p-4 bg-light rounded border-0"
      >
        <h1 className="text-center text-success">Space Core</h1>
        <h2 className="text-center text-dark mb-4">Login</h2>

        {/* Alerts */}
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

        <label className="text-muted mt-3">
          <i className="bi bi-envelope me-2 text-secondary"></i>
          <strong>Email</strong>
        </label>
        <input
          type="email"
          className="form-control mb-3"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-muted">
          <i className="bi bi-lock me-2 text-secondary"></i>
          <strong>Password</strong>
        </label>
        <input
          type="password"
          className="form-control mb-4"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </div>

        <div className="text-center">
          <p className="mb-0">
            <i className="bi bi-person-plus me-2 text-muted"></i>
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none fw-bold">
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;