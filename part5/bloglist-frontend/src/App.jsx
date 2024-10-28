import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')
  const [loginVisible, setLoginVisible] = useState(null)
  const [showAll, setShowAll] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername(user.username)
      setPassword('')
      showNotification('Login successful', 'success')
    } catch (error) {
      setUsername('')
      setPassword('')
      showNotification('Wrong username or password', 'error')
    }
  }

  const blogsToShow = showAll ? blogs : blogs.filter(blog => blog.user?.username === username)
  const sortedBlogsToShow = blogsToShow.sort((blogA, blogB) => blogB.likes - blogA.likes)

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none': '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const handleLogout = event => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`${returnedBlog.title} by ${returnedBlog.author} is added`, 'success')
    } catch (error) {
      showNotification(`${error.message}`, 'error')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>log out</button>

        <Togglable buttonLabel="new blog post" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
            showNotification={showNotification}
          />
        </Togglable>
      </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'your own blog post' : 'all' }
        </button>
      </div>
      <ul>
        {sortedBlogsToShow.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        )}
      </ul>
    </div>
  )
}

export default App