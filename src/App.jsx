import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const displayNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    const authUser = await loginService.login({ username, password })
    if (authUser) {
      setUser(authUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(authUser))
    } else {
      displayNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreateBlog = async (blog) => {
    console.log(blog)
    const newBlog = await blogService.create(blog, user.token)
    if (!newBlog) {
      displayNotification('Error creating blog', 'error')
      return
    }
    setBlogs(blogs.concat(newBlog))
    displayNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'notification')
  }

  const handleLikeBlog = async (blog) => {
    const likedBlog = await blogService.like(blog, user.token)
    if (likedBlog) {
      const newBlogs = blogs.map(b => b.id === likedBlog.id ? likedBlog : b)
      setBlogs(newBlogs)
    } else {
      console.log('Error liking blog')
    }
  }

  const handleDeleteBlog = async (blog) => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (!confirmation) { return }

    const deletedBlog = await blogService.deleteBlog(blog, user.token)

    if (deletedBlog) {
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
      displayNotification(`Blog ${blog.title} by ${blog.author} deleted`, 'notification')
    } else {
      displayNotification('Error deleting blog', 'error')
    }
  }

  if (user === null) {
    return (
      <Login onSubmit={handleLogin} notiMessage={notification}/>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification data={notification}/>
      <p>{user.name} logged-in <button onClick={handleLogout}>Log out</button></p>
      <CreateBlog onCreate={handleCreateBlog}/>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} onLikeBlog={handleLikeBlog} showDelete={blog.user.username === user.username} onDeleteBlog={handleDeleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App