import { useState } from "react"

const Blog = ({ blog, onLikeBlog }) => {
  const [detailShown, setDetailShown] = useState(false)

  const toggleDetail = () => {
    setDetailShown(!detailShown)
  }

  const handleLikeBlog = () => {
    onLikeBlog(blog)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={handleLikeBlog}>like</button></div>
      <div>added by {blog.user.name}</div>
    </div>
  )

  return (
    <div className="blog">
      <h3>{blog.title} by {blog.author} <button onClick={toggleDetail}>{detailShown ? "hide details" : "view details"}</button></h3>
      {detailShown && details()}
    </div>  
  )
}

export default Blog