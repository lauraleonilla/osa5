import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none', marginTop: '12px' }
  
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
        <li onClick={toggleVisibility}>{props.blog.title} {props.blog.author}</li>
            <div style={showWhenVisible}>
                <span>Likes: {props.blog.likes}</span><button onClick={props.likesHandler}>Like</button>
                <p>Added by: {props.blog.user.name}</p>
                <a href={`http://${props.blog.url}`}>{props.blog.url}</a>
            </div>
      </div>
    )
  })

export default Blog