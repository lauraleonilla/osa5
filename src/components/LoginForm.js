import React from 'react'

const LoginForm = ({
  login,
  username,
  password,
  passwordHandler
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
        value={password}
        name='Password'
        onChange={({ target }) => passwordHandler(target.value)}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
)

export default LoginForm
