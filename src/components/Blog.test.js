import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './ToggleBlogView'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog buttonLabel='show...'>
        <div className='testDiv' />
      </Blog>
    )
  })

  it('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  it('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  it('after clicking the button, children are displayed', () => {
    const button = component.container.querySelector('.toggleBtn')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  it('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.container.querySelector('button:nth-child(2)')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
