import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { httpClient } from './index'

// 요청 데이터 타입 정의
type RequestData =
  | Record<string, unknown>
  | Array<unknown>
  | string
  | number
  | boolean
  | null
  | undefined

// GET 요청 함수
export const apiGet = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.get<T>(endpoint, config)
}

// POST 요청 함수
export const apiPost = async <T, D extends RequestData = Record<string, unknown>>(
  endpoint: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.post<T>(endpoint, data, config)
}

// PUT 요청 함수
export const apiPut = async <T, D extends RequestData = Record<string, unknown>>(
  endpoint: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.put<T>(endpoint, data, config)
}

// PATCH 요청 함수
export const apiPatch = async <T, D extends RequestData = Record<string, unknown>>(
  endpoint: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.patch<T>(endpoint, data, config)
}

// DELETE 요청 함수
export const apiDelete = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.delete<T>(endpoint, config)
}
