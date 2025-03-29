import axios from 'axios'

const isServer = typeof window === 'undefined'

const LOG_BASE_URL = isServer
  ? process.env.SERVER_LOG_API_BASE_URL
  : process.env.NEXT_PUBLIC_LOG_API_ROUTE_BASE_URL

const logHttpClient = axios.create({
  baseURL: LOG_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 1000, // 로그 전송 타임아웃 짧게 설정
})

logHttpClient.interceptors.request.use(
  async (config) => {
    return config
  },
  async (error) => {
    // 요청 오류를 콘솔에만 기록하고 애플리케이션에는 영향 없게 처리
    console.warn('로그 요청 실패:', error)
    return Promise.resolve({ status: 200, data: { success: false, error: '로그 요청 실패' } })
  },
)

logHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 응답 오류를 콘솔에만 기록하고 애플리케이션에는 영향 없게 처리
    console.warn('로그 응답 실패:', {
      status: error.response?.status,
      data: error.response?.data,
    })
    return Promise.resolve({ status: 200, data: { success: false, error: '로그 응답 실패' } })
  },
)

export default logHttpClient
