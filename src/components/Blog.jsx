import { useState } from "react"

const Blog = ({ blog, onLikeBlog, showDelete, onDeleteBlog }) => {
  const [detailShown, setDetailShown] = useState(false)

  const toggleDetail = () => {
    setDetailShown(!detailShown)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={() => onLikeBlog(blog)}>like</button></div>
      <div>added by {blog.user.name}</div>
      {showDelete && <button onClick={() => onDeleteBlog(blog)}>Delete blog</button>}
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