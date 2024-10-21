const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./api_test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('testing API endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const testUser = new User({ username: 'testuser', name: 'test user', passwordHash })
    await testUser.save()

    helper.initialBlogPosts.forEach(blog => {
      blog.user = testUser._id
    })
    await Blog.insertMany(helper.initialBlogPosts)

  })

  describe('GET /api/blogs', () => {

    test('blog posts are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('initial blog count is two', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, 2)
    })

    test('the first blog post is authored by Tigergutt', async () => {
      const response = await api.get('/api/blogs')
      const contents = response.body.map(e => e.author)
      assert(contents.includes('Tigergutt'))
    })

    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      delete resultBlog.body.user
      delete blogToView.user
      assert.deepStrictEqual(resultBlog.body, blogToView)
    })
  })

  describe('Blog ID verification', () => {
    test('blog id is defined, _id is not present', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach(blog => {
        assert(blog.id !== undefined)
        assert(blog._id === undefined)
      })
    })
  })

  describe('POST /api/blogs', () => {

    test('valid post is successfully added', async () => {

      const usersAtStart = await helper.usersInDb()
      const testUser = usersAtStart[0]
      helper.newValidBlogPost.user = testUser.id

      await api
        .post('/api/blogs')
        .send(helper.newValidBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)

      assert.strictEqual(response.body.length, helper.initialBlogPosts.length + 1)

      assert(titles.includes('What a beautiful day'))
    })

    test('likes default to 0 if missing in the post', async () => {

      await api
        .post('/api/blogs')
        .send(helper.blogMissingLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const likesInLatestPost = response.body.filter(item => item.title === 'This post has no likes :(')[0].likes

      assert.strictEqual(likesInLatestPost, 0)
    })

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

  describe('DELETE /api/blogs/:id', () => {

    test('valid post can be deleted', async () => {

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAfterDelete = await helper.blogsInDb()

      assert.strictEqual(blogsAfterDelete.length, helper.initialBlogPosts.length - 1)
      const titles = blogsAfterDelete.map(blog => blog.title)
      assert.strictEqual(titles.includes(blogToDelete.title), false)
    })
  })

  describe('PUT /api/blogs/:id', () => {

    test('valid post can be updated', async () => {

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[1]
      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(helper.updatedBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, helper.updatedBlogPost.title)
      assert.strictEqual(response.body.author, helper.updatedBlogPost.author)
      assert.strictEqual(response.body.url, helper.updatedBlogPost.url)
      assert.strictEqual(response.body.likes, helper.updatedBlogPost.likes)
      assert.strictEqual(blogToUpdate.id, response.body.id)
    })
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
