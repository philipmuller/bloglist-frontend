import { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({ onSubmit, notiMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginPress = (event) => {
    event.preventDefault()
    onSubmit({ username, password })
  }

  return (
    <div>
      <h2>Log in</h2>
      <Notification data={notiMessage}/>
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

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  notiMessage: PropTypes.object
}

export default Login