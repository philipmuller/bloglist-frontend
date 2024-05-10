import { useState } from 'react'

const CreateBlog = ({ onCreate }) => {
    const [newBlogVisible, setNewBlogVisible] = useState(false)
    const [blogData, setBlogData] = useState({ title: '', author: '', url: '' })

    const handleCreatePress = (event) => {
        event.preventDefault()
        onCreate(blogData)
        setBlogData({ title: '', author: '', url: '' })
    }

    const handleCancelPress = () => {
        setBlogData({ title: '', author: '', url: '' })
        setNewBlogVisible(false)
    }

    const newBlogButton = () => (
        <button onClick={() => setNewBlogVisible(true)}>New blog entry</button>
    )

    const newBlogForm = () => (
        <>
        <h2>Create new entry</h2>
        <form onSubmit={handleCreatePress}>
            <div>
                Title: <input value={blogData.title} onChange={(event) => {setBlogData({...blogData, title: event.target.value})}}/>
            </div>
            <div>
                Author: <input value={blogData.author} onChange={(event) => {setBlogData({...blogData, author: event.target.value})}}/>
            </div>
            <div>
                URL: <input value={blogData.url} onChange={(event) => {setBlogData({...blogData, url: event.target.value})}}/>
            </div>
            <button type="submit">Create</button>
            <button onClick={handleCancelPress}>Cancel</button>
        </form>
        </>
    )
    
    return (
        <div>
        {newBlogVisible ? newBlogForm() : newBlogButton()}
        </div>  
    )
}
  
  export default CreateBlog