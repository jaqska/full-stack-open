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

describe('testing if title or url is missing', () => {
  test('post missing title will return 400 bad request', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogMissingTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.status, 400)})

  test('post missing url will return 400 bad request', async () => {

    const response = await api
      .post('/api/blogs')
      .send(helper.blogMissingUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.status, 400) })
})
