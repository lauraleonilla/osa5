import React, { useState, useImperativeHandle } from 'react'

const ToggleBlog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <li onClick={toggleVisibility} className='toggleView'>
        {props.blog.title} Written by: {props.blog.author}
      </li>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
      </div>
    </div>
  )
})

export default ToggleBlog
