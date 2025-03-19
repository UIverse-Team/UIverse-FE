import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const HttpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
HttpClient.interceptors.request.use(
  async (config) => {
    return config
  },
  async (error) => {
    console.error('에러발생', error)
    return Promise.reject(error)
  },
)

export default HttpClient
