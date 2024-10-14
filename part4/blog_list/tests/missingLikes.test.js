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

describe('testing for missing likes', () => {
  test('post missing likes will default to 0 ', async () => {

    await api
      .post('/api/blogs')
      .send(helper.blogMissingLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likesInLatestPost = response.body.filter(item => item.title === 'This post has no likes :(')[0].likes

    assert.strictEqual(likesInLatestPost, 0)
  })
})