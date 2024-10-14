const blogRouter = require('express').Router()
const Blog = require('../models/blog_list')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id)
  response.json(blogPost)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title or URL is missing' });
  }
  const blogPost = new Blog(body)
  const savedBlogPost = await blogPost.save()
  response.status(201).json(savedBlogPost)
})

module.exports = blogRouter

