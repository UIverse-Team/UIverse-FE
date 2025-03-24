import axios from 'axios'

const isServer = typeof window === 'undefined'

const BASE_URL = isServer
  ? process.env.NEXT_PUBLIC_SERVER_API_V1_BASE_URL
  : process.env.NEXT_PUBLIC_API_ROUTE_BASE_URL

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
httpClient.interceptors.request.use(
  async (config) => {
    return config
  },
  async (error) => {
    console.error('에러발생', error)
    return Promise.reject(error)
  },
)

export default httpClient
