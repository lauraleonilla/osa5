import React, { useState, useEffect } from 'react'

import loginService from './services/loginService'
import blogService from './services/blogService'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogger')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedInBlogger', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      setErrorMessage('Käyttäjätunnus tai salasana väärin')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogger')
    window.location.reload()
  }

  const handleSetUserName = username => {
    setUsername(username)
  }

  const handleSetPassword = password => {
    setPassword(password)
  }

  const handleSetBlogs = (blog, message) => {
    setBlogs(blogs.concat(blog))
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div className='appDiv'>
      <Notification message={message} />
      <Error errorMessage={errorMessage} />
      {user === null ? (
        <div>
          <h2>Login</h2>
          <Togglable buttonLabel="Login">
            <LoginForm
              login={handleLogin}
              password={password}
              username={username}
              usernameHandler={handleSetUserName}
              passwordHandler={handleSetPassword}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <div className='userInfo'>
            <label>{user.name} is logged in</label>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
          <BlogForm blogHandler={handleSetBlogs} />
          <ul>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
