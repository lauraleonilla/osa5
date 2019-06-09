import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleSetUserName, handleSetPassword }) => (
    <form onSubmit={handleLogin}>
      <div>
      <label>Käyttäjätunnus</label>
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => handleSetUserName(target.value)}
          />
      </div>
      <div>
      <label>Salasana</label>
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => handleSetPassword(target.value)}
          />
      </div>
      <button type='submit'>Kirjaudu</button>
    </form>      
  )

  export default LoginForm