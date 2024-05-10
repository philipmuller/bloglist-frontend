import { useState } from 'react'

const CreateBlog = ({ onCreate }) => {
    const [newBlogVisible, setNewBlogVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreatePress = (event) => {
        event.preventDefault()
        setTitle('')
        setAuthor('')
        setUrl('')
        onCreate({ title, author, url })
    }

    const handleCancelPress = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
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
                Title: <input value={title} onChange={(event) => {setTitle(event.target.value)}}/>
            </div>
            <div>
                Author: <input value={author} onChange={(event) => {setAuthor(event.target.value)}}/>
            </div>
            <div>
                URL: <input value={url} onChange={(event) => {setUrl(event.target.value)}}/>
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