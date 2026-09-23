import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Login</h1>

        <form>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            LOGIN
          </button>
        </form>

        <p>
          Don't have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login