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
        type={username.type}
        value={username.value}
        name='Username'
        onChange={username.onChange}
      />
    </div>
    <div>
      <label>Password</label>
      <input
        type='password'
        value={password.value}
        name='Password'
        onChange={password.onChange}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
)

export default LoginForm
