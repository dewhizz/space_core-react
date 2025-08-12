import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading('Registering User Account...');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('secretKey', secretKey);
      if (avatar) formData.append('avatar', avatar);

      const res = await axios.post(
        "https://space-core.onrender.com/user/Auth/register",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (res.data.newUser) {
        setLoading('');
        setUploadProgress(0);
        setSuccess(res.data.message);
        alert('Registration Successful! You will be redirected to login');
        navigate('/login');
      }

      if (res.status === 403) {
        setError('Unauthorized access');
      }

      setLoading('');
      setError(res.data.message);
    } catch (error) {
      setError(error.message);
      setLoading('');
      setUploadProgress(0);
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
    color: '#ffab00',
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #3e2723, #b71c1c)',
        fontFamily: 'Poppins, sans-serif',
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card shadow p-4"
        style={{
          maxWidth: '500px',
          width: '100%',
          borderRadius: '16px',
          backgroundColor: '#fff',
        }}
        encType="multipart/form-data"
      >
        <h1 className="text-center" style={{ color: '#b71c1c', fontWeight: '700' }}>
          Space Core
        </h1>
        <h4 className="text-center mb-4" style={{ color: '#333', fontWeight: '600' }}>
          <i className="bi bi-person-plus me-2"></i>Create Account
        </h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {loading && <div className="alert alert-warning">{loading}</div>}

        {uploadProgress > 0 && (
          <div className="mb-3">
            <div className="progress" style={{ height: '20px', borderRadius: '8px' }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{
                  width: `${uploadProgress}%`,
                  backgroundColor: '#ffab00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  color: '#fff',
                }}
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}

        {/* Avatar Upload */}
        <div className="text-center mb-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ffab00',
              }}
            />
          ) : (
            <i className="bi bi-person-circle" style={{ fontSize: '100px', color: '#ccc' }}></i>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="form-control mt-2"
            style={{ borderRadius: '8px' }}
          />
        </div>

        <div style={iconWrapperStyle}>
          <i className="bi bi-person" style={iconStyle}></i>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={iconWrapperStyle}>
          <i className="bi bi-envelope" style={iconStyle}></i>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={iconWrapperStyle}>
          <i className="bi bi-lock" style={iconStyle}></i>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={iconWrapperStyle}>
          <i className="bi bi-key" style={iconStyle}></i>
          <input
            type="password"
            className="form-control"
            placeholder="Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div className="d-grid mb-3">
          <button
            type="submit"
            className="btn"
            style={{
              background: 'linear-gradient(to right, #ffab00, #b71c1c)',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '8px',
              padding: '12px',
              border: 'none',
              fontSize: '16px',
            }}
          >
            <i className="bi bi-check-circle me-2"></i>Register
          </button>
        </div>

        <div className="text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ffab00', fontWeight: '500', textDecoration: 'none' }}>
              <i className="bi bi-box-arrow-in-right me-1"></i>Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;