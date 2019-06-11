import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Simpleblog from './Simpleblog'

describe('<Simpleblog />', () => {
  const blog = {
    title: 'Testing blog title',
    author: 'Will Smith',
    likes: 6
  }
  const component = render(<Simpleblog blog={blog} />)
  const headLine = component.container.querySelector('.headLine')
  const blogLikes = component.container.querySelector('.blogLikes')
  console.log(prettyDOM(headLine))
  console.log(prettyDOM(blogLikes))

  test('Renders title, author and likes', () => {
    expect(component.container).toHaveTextContent('Testing blog title')
    expect(component.container).toHaveTextContent('Will Smith')
    expect(component.container).toHaveTextContent(
      `blog has ${blog.likes} likes`
    )
  })

  it('Clicking the like button twice calls event handler twice', async () => {
    const blog = {
      title: 'Testing blog title',
      author: 'Will Smith',
      likes: 6
    }

    const mockHandler = jest.fn()

    const component = render(
      <Simpleblog blog={blog} onClick={mockHandler} />
    )
    const button = component.container.querySelector('#likeBtn')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
