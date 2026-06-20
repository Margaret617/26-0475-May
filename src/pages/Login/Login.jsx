import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this should be handled securely on the server
    if (password === 'motore2024') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/private-notes');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Private Notes</h2>
          <p>Enter the password to access restoration logs and costs</p>
          
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn">
              Access Notes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;