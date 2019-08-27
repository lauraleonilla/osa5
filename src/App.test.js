import React from 'react'
import App from './App'
import { render, waitForElement } from '@testing-library/react'
import mocks from './services/__mocks__/blogs'
jest.mock(mocks)

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    const notes = component.container.querySelectorAll('.blog')
    expect(notes.length).toBe(1)
  })
})