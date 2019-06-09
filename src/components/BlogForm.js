import React, { useState } from 'react'
import blogService from '../services/blogService'

const BlogForm = ({ blogHandler }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl]= useState('')

  const handleBlogChange = (blogTitle) => {
    setBlogTitle(blogTitle)
  }

  const handleAuthorChange = (author) => {
    setAuthor(author)
  }

  const handleUrlChange = (url) => {
      setUrl(url)
  }

  const addBlog = async (event) => {
    event.preventDefault()
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
  )
}

export default BlogForm
