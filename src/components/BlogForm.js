import React from 'react'
import blogService from '../services/blogService'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'

import { useField } from '../hooks/index'

const BlogForm = ({ blogHandler }) => {
  const blogTitle = useField('text')
  const author = useField('text')
  const url = useField('text')

  BlogForm.propTypes = {
    blogHandler: PropTypes.func.isRequired
  }

  const blogFormRef = React.createRef()

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: blogTitle.value,
      author: author.value,
      url: url.value
    }
    const newBlog = await blogService.create(blogObject)
    const message = `Added blog ${blogTitle.value} by ${author.value}`
    blogHandler(newBlog, message)
    blogTitle.reset()
    author.reset()
    url.reset()
  }

  return (
    <Togglable buttonLabel='Create new' ref={blogFormRef}>
      <div className='blogFormDiv'>
        <form onSubmit={addBlog}>
          <div>
            <label id='addNew'>Title</label>
            <input
              type={blogTitle.type}
              value={blogTitle.value}
              onChange={blogTitle.onChange}
            />
          </div>
          <div>
            <label id='addNew'>Author</label>
            <input
              type={author.type}
              value={author.value}
              onChange={author.onChange}
            />
          </div>
          <div>
            <label id='addNew'>URL</label>
            <input
              type={url.type}
              value={url.value}
              onChange={url.onChange}
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
