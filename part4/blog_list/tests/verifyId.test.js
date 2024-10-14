const { test, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const assert = require('assert')
const Blog = require('../models/blog_list')
const helper = require('./api_test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogPosts)
})

describe('vefifying id', () => {
  test('verify id property, not _id (by default)', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert(blog.id !== undefined)
      assert(blog._id === undefined)
    })
  })
})