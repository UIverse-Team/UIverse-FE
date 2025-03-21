import { SERVER_API_V1_BASE_URL } from '@/constans/serverApi'
import axios from 'axios'

const isServer = typeof window === 'undefined'

const BASE_URL = isServer ? SERVER_API_V1_BASE_URL : process.env.NEXT_PUBLIC_API_ROUTE_BASE_URL

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
