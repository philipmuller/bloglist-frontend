import { useState } from 'react'

const CreateBlog = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreatePress = (event) => {
        event.preventDefault()
        onCreate({ title, author, url })
    }
    
    return (
        <div>
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
            </form>
        </div>  
    )
}
  
  export default CreateBlog