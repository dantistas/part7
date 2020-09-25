import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import CreateNewBlog from './createblog'

test('renders title and author', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor'
  }

  const component = render(
    <Blog blog={blog} />
  )


const title = component.container.querySelector('.title-class')    

  const author = component.container.querySelector('.author-class')   

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})


test('clicking the button renders likes and url', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'www.test.test',
        likes: 0
      }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} view={mockHandler} />
    )
  
    const button = component.getByText('view')
    fireEvent.click(button)
    const urlAndLikes = component.container.querySelector('.after-view-click-class')    
    expect(urlAndLikes).not.toHaveStyle('display: none')

  })

  test('clicking the button likes twice, props called twice', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'www.test.test',
        likes: 0
      }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} onClickLikePost={mockHandler} />
    )
    
    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })


test('<BlogForm /> when new blog is called , form calls event handler received as a prop', () => {
  const createBlog = jest.fn()
  
  const component = render(
    <CreateNewBlog createBlog={createBlog}/>
  )
  
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'test title' } 
  })
  fireEvent.change(author, { 
    target: { value: 'test author' } 
  })
  fireEvent.change(url, { 
    target: { value: 'test url' } 
  })

  fireEvent.submit(form)
  console.log(createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({"author": "test author", "title": "test title", "url": "test url"})
})