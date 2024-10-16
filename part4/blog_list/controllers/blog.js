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
    return response.status(400).json({ error: 'Title or URL is missing' })
  }
  const blogPost = new Blog(body)
  const savedBlogPost = await blogPost.save()
  response.status(201).json(savedBlogPost)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const blogPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blogPost, { new: true })
  response.status(201).json(updatedBlog)
})

module.exports = blogRouter

