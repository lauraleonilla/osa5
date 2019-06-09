import React from 'react'

const LoginForm = ({ login, username, password, usernameHandler, passwordHandler }) => (
    <form onSubmit={login}>
      <div>
      <label>Username</label>
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => usernameHandler(target.value)}
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