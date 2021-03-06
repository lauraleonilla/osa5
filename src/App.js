import React, { useState, useEffect } from 'react'

import loginService from './services/loginService'
import blogService from './services/blogService'

import ToggleBlog from './components/ToggleBlogView'
import BlogContents from './components/BlogContents'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useField } from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
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
    try {
      event.preventDefault()
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem('loggedInBlogger', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  const handleLikes = async id => {
    const blog = blogs.find(e => e.id === id)
    const updatedBlog = {
      ...blog,
      likes: (blog.likes += 1),
      user: blog.user.id
    }
    try {
      const newBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : newBlog)))
    } catch (exeption) {
      setErrorMessage('Blogia ei löydy')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const removeBlog = async deleteId => {
    deleteId = blogs.find(e => e.id === deleteId)
    if (window.confirm('Poistetaanko blogi')) {
      deleteId = deleteId.id
      try {
        await blogService.remove(deleteId)
        const updatedBlogs = [...blogs]
        blogs.forEach(e => e.id === deleteId)
        for (let i = 0; i < blogs.length; i++) {
          const blog = blogs[i]
          if (blog.id === deleteId) {
            updatedBlogs.splice(i, 1)
            setMessage('Blogi poistettu')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            break
          }
          setBlogs(updatedBlogs)
        }
      } catch (exeption) {
        setErrorMessage('Blogia ei löydy')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== deleteId))
      }
    }
  }

  const blogRows = () => {
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    const rows = sorted.map((blog, i) => (
      <ToggleBlog key={i} blog={blog}>
        <BlogContents
          blog={blog}
          user={user}
          removeHandler={() => removeBlog(blog.id)}
          likesHandler={() => handleLikes(blog.id)}
        />
      </ToggleBlog>
    ))
    return rows
  }

  const handleSetBlogs = (blog, message) => {
    setBlogs(blogs.concat(blog))
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const omitReset = (props) => {
    delete props.reset
    return props
  }

  const loginForm = () => {

    const usernameProps = omitReset(username)
    const passWordProps = omitReset(password)

    return (
      <Togglable buttonLabel='Login'>
        <LoginForm
          login={handleLogin}
          username={usernameProps}
          password={passWordProps}
        />
      </Togglable>
    )
  }

  return (
    <div className='appDiv'>
      <Notification message={message} />
      <Error errorMessage={errorMessage} />
      {user === null ? (
        <div>
          <h2>Login</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <div className='userInfo'>
            <label>{user.name} is logged in</label>
            <button onClick={() => handleLogout()} className='logoutBtn'>Logout</button>
          </div>
          <BlogForm blogHandler={handleSetBlogs} />
          <ul>{blogRows()}</ul>
        </div>
      )}
    </div>
  )
}

export default App
