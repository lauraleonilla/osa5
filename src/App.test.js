import React from 'react'
import App from './App'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogService')

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.loginBtn'))
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
  test('Blogs are visible when user is logged in', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedInBlogger', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.logoutBtn'))
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
  })
})
