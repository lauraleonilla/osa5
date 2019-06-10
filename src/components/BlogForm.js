import React, { useState } from 'react'
import blogService from '../services/blogService'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ blogHandler }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  BlogForm.propTypes = {
    blogHandler: PropTypes.func.isRequired
  }

  const handleBlogChange = blogTitle => {
    setBlogTitle(blogTitle)
  }

  const handleAuthorChange = author => {
    setAuthor(author)
  }

  const handleUrlChange = url => {
    setUrl(url)
  }

  const blogFormRef = React.createRef()

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: blogTitle,
      author: author,
      url: url
    }
    const newBlog = await blogService.create(blogObject)
    const message = `Added blog ${blogTitle} by ${author}`
    blogHandler(newBlog, message)
    setBlogTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='Create new' ref={blogFormRef}>
      <div className='blogFormDiv'>
        <form onSubmit={addBlog}>
          <div>
            <label id='addNew'>Title</label>
            <input
              value={blogTitle}
              onChange={({ target }) => handleBlogChange(target.value)}
            />
          </div>
          <div>
            <label id='addNew'>Author</label>
            <input
              value={author}
              onChange={({ target }) => handleAuthorChange(target.value)}
            />
          </div>
          <div>
            <label id='addNew'>URL</label>
            <input
              value={url}
              onChange={({ target }) => handleUrlChange(target.value)}
            />
          </div>
          <div>
            <button id='saveButton' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
