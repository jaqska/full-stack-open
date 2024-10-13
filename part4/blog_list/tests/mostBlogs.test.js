const { test, describe } = require('node:test')
const assert = require('node:assert')
const { mostBlogs } = require('../utils/list_helper')

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogPosts = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'It is a beautiful day',
    author: 'Ernest Hemingway',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Hemingway_263.pdf',
    likes: 14,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Why you should learn node.js',
    author: 'Peter Pan',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/PeterP023.pdf',
    likes: 21,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Nest up - next.js',
    author: 'Peter Pan',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/PeterP025.pdf',
    likes: 3,
    __v: 0
  }
  ]

  test('when list has only one blog, it returns the author and blog number equal to 1', () => {
    const result = mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has multiple blogs, it should return the author with the most blogs, plus the count', () => {
    const result = mostBlogs(listWithMultipleBlogPosts)
    assert.deepStrictEqual(result,{
      author: 'Peter Pan',
      blogs: 2
    })
  })
})