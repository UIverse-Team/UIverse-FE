import axios from 'axios'

const isServer = typeof window === 'undefined'

const BASE_URL = isServer
  ? process.env.SERVER_API_V1_BASE_URL
  : process.env.NEXT_PUBLIC_API_ROUTE_BASE_URL

console.log(BASE_URL)

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
})

httpClient.defaults.withCredentials = true

httpClient.interceptors.request.use(
  async (config) => {
    console.log(config)
    return config
  },
  async (error) => {
    console.error('요청 에러:', error)
    return Promise.reject(error)
  },
)

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('응답 에러 상세:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    })
    return Promise.reject(error)
  },
)

export default httpClient
