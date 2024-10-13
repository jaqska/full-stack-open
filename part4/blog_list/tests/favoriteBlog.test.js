const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favoriteBlog } = require('../utils/list_helper')

describe('most likes', () => {
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
    title: 'Testing is cool',
    author: 'Mr Tester',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/test101.pdf',
    likes: 54,
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
  }]

  test('if list has no blog posts, it returns null', () => {
    const result = favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog, it returns this blog post', () => {
    const result = favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    })
  })

  test('when list has multiple blogs, it returns the blog post with most likes', () => {
    const result = favoriteBlog(listWithMultipleBlogPosts)
    assert.deepStrictEqual(result,
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Testing is cool',
        author: 'Mr Tester',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/test101.pdf',
        likes: 54,
        __v: 0
      }
    )
  })
})