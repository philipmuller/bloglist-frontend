import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    return null
  }
}

const like = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, {...blog, likes: blog.likes+1}, config)
    return response.data
  } catch (error) {
    return null
  }
}

const deleteBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return "success"
  } catch (error) {
    return null
  }
}

export default { getAll, create, like, deleteBlog }