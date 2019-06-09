import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/loginService'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogger')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInBlogger', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exeption) {
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

  const handleSetUserName = (username) => {
    setUsername(username)
  }

  const handleSetPassword = (password) => {
    setPassword(password)
  }

  const handleSetBlogs = (blog) => {
    setBlogs(blogs.concat(blog))
  }

  return (
    <div className="appDiv">
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      {user === null ?
      <LoginForm handleLogin={handleLogin} password={password} username={username} handleSetUserName={handleSetUserName} handleSetPassword={handleSetPassword}/>
      :
      <div>
        <div className="userInfo">
          <label>{user.name} is logged in</label>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
        <BlogForm handleSetBlogs={handleSetBlogs}/>
        <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
          </ul>
      </div>
      }
    </div>
  )
}

export default App