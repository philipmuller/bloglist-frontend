import { useState } from "react"

const Login = ({ onSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginPress = (event) => {
        event.preventDefault()
        onSubmit({ username, password })
    }

    return (
        <div>
        <h2>Log in</h2>
        <form onSubmit={handleLoginPress}>
          <div>
            username
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            password
            <input value={password} type="password" onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
}

export default Login