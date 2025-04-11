import { apiGet } from '@/libs/axios/apiMethods'
import { addQueryParams, createEndpoint } from '@/libs/axios/endPoints'
import type { Category } from '@/types/category/categoryTypes'
import { ProductResponse } from '@/types/Product/productsType'

const ENDPOINTS = {
  ROOT: '/categories/root',
  SUB: '/categories/subcategories',
  CATEGORIES_PRODUCTS: '/categories/products',
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

// 카테고리 클릭에 따른 상품 보여주기

export const fetchCategoriesProducts = async (categoryId: number): Promise<ProductResponse> => {
  try {
    const endpoint = addQueryParams(createEndpoint(ENDPOINTS.CATEGORIES_PRODUCTS), { categoryId })
    const response = await apiGet<ProductResponse>(endpoint)
    return response.data
  } catch (error) {
    console.error('카테고리 상품 조회:', error instanceof Error ? error.message : '알 수 없는 오류')
    throw error
  }
}
