import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { httpClient } from './index'

// GET 요청 함수
export const apiGet = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.get<T>(endpoint, config)
}

// POST 요청 함수
export const apiPost = async <T>(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.post<T>(endpoint, data, config)
}

// PUT 요청 함수
export const apiPut = async <T>(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return httpClient.put<T>(endpoint, data, config)
}

// PATCH 요청 함수
export const apiPatch = async <T>(
  endpoint: string,
  data?: any,
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
