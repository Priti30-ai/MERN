import React, { useState, useEffect } from 'react';

// Configurable API base URL (reads from VITE_API_URL or defaults to localhost:5000)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  // Registration Form State
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMessage, setRegMessage] = useState({ text: '', type: '' });

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState({ text: '', type: '' });

  // Authentication State
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [protectedData, setProtectedData] = useState(null);
  const [protectedError, setProtectedError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync token state if localStorage changes
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // =========================================================================
  // TASK FOR YOU TO COMPLETE: Form Handlers & API Requests
  // =========================================================================

  // 1. Handle Registration
  // Objective: Make a POST request to `${API_BASE_URL}/register` with JSON { username, password }
  // - Validate that fields are not empty
  // - If response is 201, show success message and clear form inputs
  // - If response is 400 or error, show error message
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMessage({ text: '', type: '' });

    if (!regUsername.trim() || !regPassword.trim()) {
      setRegMessage({ text: 'Please fill in both username and password.', type: 'error' });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: regUsername, password: regPassword })
      });
      const data = await res.json();

      if (res.ok) {
        setRegMessage({ text: data.message || 'Registered successfully! You can now log in.', type: 'success' });
        setRegUsername('');
        setRegPassword('');
      } else {
        setRegMessage({ text: data.message || 'Registration failed.', type: 'error' });
      }
    } catch (err) {
      setRegMessage({ text: 'Could not connect to backend server.', type: 'error' });
    }
  };

  // 2. Handle Login
  // Objective: Make a POST request to `${API_BASE_URL}/login` with JSON { username, password }
  // - If response is 200: save token to localStorage, update token state, show success
  // - If response is 401 or error: show error message
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage({ text: '', type: '' });

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginMessage({ text: 'Please enter both username and password.', type: 'error' });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setLoginMessage({ text: 'Login successful!', type: 'success' });
        setLoginUsername('');
        setLoginPassword('');
        setProtectedError('');
      } else {
        setLoginMessage({ text: data.message || 'Login failed.', type: 'error' });
      }
    } catch (err) {
      setLoginMessage({ text: 'Could not connect to backend server.', type: 'error' });
    }
  };

  // 3. Handle Fetch Protected Route
  // Objective: Make a GET request to `${API_BASE_URL}/protected`
  // - Include Header: { 'Authorization': `Bearer ${token}` }
  // - If 200: set protected data and clear errors
  // - If 401 or 403: show error message (e.g. invalid or expired token)
  const handleFetchProtected = async () => {
    setLoading(true);
    setProtectedError('');
    setProtectedData(null);

    try {
      const currentToken = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken || ''}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setProtectedData(data);
      } else {
        setProtectedError(data.message || `Access denied (Status ${res.status})`);
      }
    } catch (err) {
      setProtectedError('Could not reach protected endpoint.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Logout
  // Objective: Remove token from localStorage and clear application state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setProtectedData(null);
    setProtectedError('');
    setLoginMessage({ text: 'Logged out successfully.', type: 'info' });
  };

  return (
    <div className="container">
      <header>
        <h1>Task 36 — JWT Authentication</h1>
        <p>Express.js Backend & React Frontend Integration</p>
      </header>

      {/* Forms Section: Register & Login */}
      <div className="grid-2">
        {/* Registration Card */}
        <div className="card">
          <h2>1. User Registration</h2>
          {regMessage.text && (
            <div className={`alert alert-${regMessage.type}`}>{regMessage.text}</div>
          )}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="Enter new username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>

        {/* Login Card */}
        <div className="card">
          <h2>2. User Login</h2>
          {loginMessage.text && (
            <div className={`alert alert-${loginMessage.type}`}>{loginMessage.text}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>

      {/* Protected Resource Section */}
      <div className="card">
        <h2>3. Protected Route Access (GET /protected)</h2>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '12px' }}>
          This route requires an <code>Authorization: Bearer &lt;token&gt;</code> request header.
        </p>

        {token ? (
          <div>
            <div className="alert alert-success">
              <strong>Active Session:</strong> You currently hold a JWT in localStorage.
            </div>
            <div className="token-box">
              <strong>Stored Token:</strong><br />
              {token}
            </div>
            <div className="btn-group">
              <button onClick={handleFetchProtected} disabled={loading}>
                {loading ? 'Fetching...' : 'Access Protected Data'}
              </button>
              <button onClick={handleLogout} className="btn-danger">
                Log Out (Clear Token)
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="alert alert-info">
              No JWT found in localStorage. Log in above or test unauthorized access below.
            </div>
            <button onClick={handleFetchProtected} className="btn-secondary" disabled={loading}>
              {loading ? 'Fetching...' : 'Try Accessing Protected Data Without Token'}
            </button>
          </div>
        )}

        {protectedError && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            <strong>Protected Request Failed:</strong> {protectedError}
          </div>
        )}

        {protectedData && (
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '15px', color: '#22543d' }}>Protected Response Data:</h3>
            <pre>{JSON.stringify(protectedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
