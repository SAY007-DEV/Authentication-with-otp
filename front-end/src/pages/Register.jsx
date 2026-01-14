import React from 'react'
import './register.css'

function Register() {
  return (
    <div>
      <div className="wrapper">
        <div className="title">
          REGISTER
        </div>
        <form action="#">
          <div className="field">
            <input type="text" required />
            <label>Full Name</label>
          </div>
          <div className="field">
            <input type="email" required />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input type="password" required />
            <label>Password</label>
          </div>
          <div className="field">
            <input type="password" required />
            <label>Confirm Password</label>
          </div>
          <div className="field">
            <input type="submit" defaultValue="Register" />
          </div>
          <div className="signup-link">
            Already have an account? <link rel="stylesheet" href="/login">Login</link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register