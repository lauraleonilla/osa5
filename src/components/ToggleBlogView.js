import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef((props, ref) => {
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
        <li onClick={toggleVisibility}>{props.blog.title} {props.blog.author}
            <div style={showWhenVisible}>
            {props.blog.url}
            </div>
        </li>
      </div>
    )
  })

export default Blog