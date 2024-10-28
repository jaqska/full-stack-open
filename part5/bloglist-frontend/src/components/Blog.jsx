import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleDeleteBlog, user }) => {
  const [isHidden, setIsHidden] = useState(true)
  const [likes, setLikes] = useState(blog?.likes || 0)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const show = () => {
    setIsHidden(!isHidden)
  }

  const handleLike = async () => {
    try {
      const returnedBlog = await blogService.update(blog.id, { likes: likes + 1 })
      setLikes(returnedBlog.likes)
    } catch (error) {
      console.error('Failed to update likes', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        handleDeleteBlog(blog.id)
      } catch (error) {
        console.error('Failed to update likes', error)
      }
    }
  }

  const isBlogOwner = blog.user?.username === user?.username

  return isHidden ? (
    <div>
      {blog.title} by {blog.author}
      <button onClick={() => show()}>view</button>
    </div>
  )
    : (
      <div style={blogStyle}>
        {blog.title} by {blog.author}
        <button onClick={() => show()}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        {isBlogOwner && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
    )
}

export default Blog