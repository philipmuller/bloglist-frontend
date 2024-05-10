import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = (credentials) => {
  const request = axios.post(baseUrl, credentials)
  return request.then(response => response.data)
}

export default { login }