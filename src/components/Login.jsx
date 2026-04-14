import React, { useState } from 'react';

const Login = ({ onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const users = JSON.parse(localStorage.getItem('aura_users') || '{}');

    if (isRegistering) {
      if (users[email]) {
        setError('An account with this email already exists.');
        return;
      }
      users[email] = { password };
      localStorage.setItem('aura_users', JSON.stringify(users));
      alert('Registration successful! You are now logged in.');
      onLoginSuccess(email);
    } else {
      if (!users[email] || users[email].password !== password) {
        setError('Invalid email or password.');
        return;
      }
      onLoginSuccess(email);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <div className="login-overlay">
      <div className="login-modal glass-card">
        <button className="close-btn" onClick={onClose} aria-label="Close login dialog">
          &times;
        </button>
        <div className="login-header">
          <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isRegistering ? 'Join Aura Dining to manage reservations.' : 'Login to manage your reservations and preferences.'}</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder={isRegistering ? "Create a password" : "Enter your password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isRegistering ? "new-password" : "current-password"}
            />
          </div>
          <button type="submit" className="btn-primary btn-solid" style={{ width: '100%', marginTop: '1rem' }}>
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="login-footer">
          <p>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <a href="#" onClick={toggleMode} className="register-link">
              {isRegistering ? "Login here" : "Register here"}
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .login-modal {
          position: relative;
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          background: var(--bg);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .close-btn:hover {
          color: var(--primary);
        }

        .login-header h2 {
          font-family: 'Cinzel', serif;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        .login-header p {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .error-message {
          color: #ff4d4f;
          background: rgba(255, 77, 79, 0.1);
          padding: 0.8rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          border: 1px solid rgba(255, 77, 79, 0.2);
        }

        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .register-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }

        .register-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
