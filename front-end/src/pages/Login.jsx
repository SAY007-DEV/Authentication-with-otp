import React from 'react'

function Login() {
  return (
    <div>

<div>
      <div className="wrapper">
        <div className="title">
          Registration Form
        </div>
        <form >
          
          <div className="field">
            <input type="email" required />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input type="password" required />
            <label>Password</label>
          </div>
         
          <div className="field">
            <input type="submit" defaultValue="Login" />
          </div>
          <div className="signup-link">
            Create  an account? <link rel="stylesheet" href="/register" />
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login