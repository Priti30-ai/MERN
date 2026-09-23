import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Sign Up</h1>

        <form>
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Enter your name"
          />

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
          />

          <button type="submit">
            SIGN UP
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup