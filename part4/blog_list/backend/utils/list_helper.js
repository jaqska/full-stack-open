const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((mostLiked, current) => {
    return current.likes > mostLiked.likes ? current : mostLiked
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = _.countBy(blogs, 'author')

  const topAuthor = _.maxBy(Object.entries(authorCount), count => count)

  return {
    author: topAuthor[0],
    blogs: topAuthor[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorGrouped = _.groupBy(blogs, 'author')

  const authorLikes = _.map(authorGrouped, (blogs, author) => {
    const totalLikes = _.sumBy(blogs, 'likes')
    return {
      author: author,
      likes: totalLikes
    }
  })

  return _.maxBy(authorLikes, 'likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}