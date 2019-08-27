import React from 'react'
import App from './App'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogService')

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.loginBtn')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
})