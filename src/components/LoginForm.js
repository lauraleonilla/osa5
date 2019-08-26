import React from 'react'

const LoginForm = ({
  login,
  username,
  password,
}) => (
  <form onSubmit={login}>
    <div>
      <label>Username</label>
      <input
        name='Username'
        {...username}
      />
    </div>
    <div>
      <label>Password</label>
      <input
        name='Password'
        {...password}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
)

export default LoginForm
