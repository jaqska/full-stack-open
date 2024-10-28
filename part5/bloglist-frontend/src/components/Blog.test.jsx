import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

const mockDeleteBlog = vi.fn()
const mockUser = { username: 'tester', name: 'test user' }

test('initially only renders title and author', async () => {
  const blog = {
    id: 1,
    title: 'A blog post to test',
    author: 'Mr Tester',
    url: 'testing.org',
    likes: 1,
    user: { username: 'tester', name: 'test user'
    }
  }

  render(<Blog
    key={blog.id}
    blog={blog}
    handleDeleteBlog={mockDeleteBlog}
    user={mockUser}
  />)

  const titleText = await screen.queryByText(blog.title)
  const authorText = await screen.queryByText(blog.author)
  const urlText = await screen.queryByText(blog.url)
  const likesText = await screen.queryByText(blog.likes)
  expect(titleText).toBeDefined()
  expect(authorText).toBeDefined()
  expect(urlText).toBe(null)
  expect(likesText).toBe(null)
})