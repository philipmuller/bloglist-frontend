import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async ({username, password}) => {
    const authUser = await loginService.login({ username, password })
    if (authUser) {
      setUser(authUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(authUser))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <Login onSubmit={handleLogin} />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in <button onClick={handleLogout}>Log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App