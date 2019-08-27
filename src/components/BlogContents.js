import React from 'react'

const BlogContents = props => {

  const removeButton = () => {
    return <button onClick={props.removeHandler}>Remove</button>
  }

  return (
    <li className='blog'>
      <span>Likes: {props.blog.likes}</span>
      <button onClick={props.likesHandler}>Like</button>
      <p>Added by: {props.blog.user.username}</p>
      <a href={`http://${props.blog.url}`}>{props.blog.url}</a>
      <br />
      {props.user.username === props.blog.user.username ? removeButton() : null}
      <br />
    </li>
  )
}

export default BlogContents
