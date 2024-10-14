const { test, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./api_test_helper')

const Blog = require('../models/blog_list')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogPosts)
})

describe('testing post request', () => {

  test('a valid post can be added ', async () => {
    const newBlogPost = {
      title: 'What a beautiful day',
      author: 'Spongebob',
      url: 'https://lifeunderwatertoday.org',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogPosts.length + 1)

    assert(titles.includes('What a beautiful day'))
  })
})
