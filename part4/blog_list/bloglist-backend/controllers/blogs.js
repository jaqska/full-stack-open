const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  response.json(blogPost)
})


blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title or URL is missing' })
  }
  const user = request.user
  // const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlogPost = await blogPost.save()
  user.blogs = user.blogs.concat(savedBlogPost._id)
  await user.save()

  response.status(201).json(savedBlogPost)
})

blogsRouter.delete('/:id', async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'authentication required' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'forbidden: you can only delete your own blogs' })
  }
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const body = request.body
  const id = request.params.id

  const user = await User.findById(body.userId)

  const blogPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blogPost, { new: true })

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter

