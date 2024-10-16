const Blog = require('../models/blog_list')

const initialBlogPosts = [
  {
    title: 'Backend is cool',
    author: 'Tigergutt',
    url: 'https://example.com',
    likes: 5
  },
  {
    title: 'Python is one of the most popular programming languages',
    author: 'Mr. Python',
    url: 'https://pythonexample.com',
    likes: 4
  }
]

const newValidBlogPost = {
  title: 'What a beautiful day',
  author: 'Spongebob',
  url: 'https://lifeunderwatertoday.org',
  likes: 6
}

const updatedBlogPost = {
  title: 'JavaScript is one of the most popular programming languages',
  author: 'Mr. Python',
  url: 'https://javascriptexample.com',
  likes: 7
}

const blogMissingLikes = {
  title: 'This post has no likes :(',
  author: 'Starship',
  url: 'https://quiteaveragebutcool.org'
}

const blogMissingTitle = {
  author: 'Starship',
  url: 'https://quiteaveragebutcool.org',
  likes: 4
}

const blogMissingUrl = {
  title: 'This post is missing an url :O',
  author: 'Starship',
  likes: 4
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Peter Pan', url: 'https://moreexamples.com'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogPosts, blogMissingLikes, blogMissingTitle, blogMissingUrl, newValidBlogPost, updatedBlogPost, nonExistingId, blogsInDb
}