import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

// 서버 여부 판단
const isServer = typeof window === 'undefined'

// API 기본 URL 설정
const BASE_URL = isServer
  ? process.env.SERVER_API_V1_BASE_URL
  : process.env.NEXT_PUBLIC_API_ROUTE_BASE_URL

// 기본 HTTP 클라이언트 생성 함수
export const createHttpClient = (config?: AxiosRequestConfig): AxiosInstance => {
  // Axios 인스턴스 생성
  const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
    ...config,
  })

  // 요청 인터셉터 설정
  httpClient.interceptors.request.use(
    async (config) => {
      if (!isServer) {
        config.withCredentials = true
      }
      return config
    },
    async (error) => {
      console.error('요청 에러:', error)
      return Promise.reject(error)
    },
  )

  // 응답 인터셉터 설정
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

  return httpClient
}

// 기본 인스턴스 생성 및 내보내기
export const httpClient = createHttpClient()

// 사용자 정의 인스턴스 생성을 위한 함수
export const createCustomHttpClient = (
  baseURL?: string,
  config?: AxiosRequestConfig,
): AxiosInstance => {
  return createHttpClient({
    ...config,
    baseURL: baseURL || BASE_URL,
  })
}
