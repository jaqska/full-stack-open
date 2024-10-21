const { test, describe } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/list_helper')

describe('total likes', () => {
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
  }]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, ut should return total likes of all blog posts', () => {
    const result = totalLikes(listWithMultipleBlogPosts)
    assert.strictEqual(result,40)
  })
})