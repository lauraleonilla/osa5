import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import 'jest-dom/extend-expect'
import Blog from './ToggleBlogView'

describe('<Blog />', () => {
  let component
  const blog = { title:'Blog Title', author:'Donald Trump', url:'www.usa.com' }

  beforeEach(() => {
    component = render(
      <Blog blog={blog}>
        <div className='testDiv' />
      </Blog>
    )
  })

  it('Renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  it('At start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  it('Displays title and author at the beginning', () => {
    const div = component.container.querySelector('.toggleView')
    expect(div).toHaveTextContent('Blog Title')
    expect(div).toHaveTextContent('Donald Trump')
  })

  it('After clicking the title, children are displayed', () => {
    const div = component.container.querySelector('.toggleView')
    fireEvent.click(div)

    const contentDiv = component.container.querySelector('.togglableContent')
    expect(contentDiv).not.toHaveStyle('display: none')
  })

  it('Toggled content can be closed', () => {
    const click = component.container.querySelector('li')
    fireEvent.click(click)
    fireEvent.click(click)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
