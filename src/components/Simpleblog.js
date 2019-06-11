import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='simpleBlog'>
    <div className='headLine'>
      {blog.title} {blog.author}
    </div>
    <div className='blogLikes'>
      blog has {blog.likes} likes
      <button id='likeBtn' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
