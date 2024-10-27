const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  response.json(blogPost)
})


blogsRouter.post('/', async (request, response) => {

  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title or URL is missing' })
  }
  const user = request.user

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

  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (!user || blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'you are not authorized to delete this blog' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const id = request.params.id
  const user = request.user
  const body = request.body

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (likes !== undefined) {
    const updatedLikesBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
    return response.status(200).json(updatedLikesBlog)
  }

  if (!user || blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'you are not authorized to update this blog' })
  }

  const blogPost = {
    title: body.title || blog.title,
    author: body.author || blog.author,
    url: body.url || blog.url,
    likes: body.likes !== undefined ? Number(body.likes) : blog.likes,
    user: user._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogPost, { new: true })

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter

