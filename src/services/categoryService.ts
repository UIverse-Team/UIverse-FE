import { apiGet } from '@/libs/axios/apiMethods'
import { addQueryParams, createEndpoint } from '@/libs/axios/endPoints'
import type { Category } from '@/types/category/categoryTypes'

const ENDPOINTS = {
  ROOT: '/categories/root',
  SUB: '/categories/subcategories',
}

export const fetchRootCategories = async (): Promise<Category[]> => {
  try {
    const endpoint = createEndpoint(ENDPOINTS.ROOT)
    const response = await apiGet<Category[]>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '1뎁스 카테고리 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}

export const fetchSubCategories = async (categoryId: number): Promise<Category[]> => {
  try {
    const endpoint = addQueryParams(createEndpoint(ENDPOINTS.SUB), { categoryId })
    const response = await apiGet<Category[]>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '서브 카테고리 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
