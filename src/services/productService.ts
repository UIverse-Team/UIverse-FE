import { ProductResponse, PopularityType, ProductSearchParams } from '@/types/Product/productsType'
import { ProductDetail } from '@/types/Product/productDetailType'
import { apiGet } from '@/libs/axios/apiMethods'
import { createEndpoint, createPathWithParams } from '@/libs/axios/endPoints'

const ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:productId',
  POPULARS: '/products/popular',
  PRODUCTS_SPECiALPRICES: '/products/specialPrices',
}

/**
 * 상품 상세 조회
 * @param productId 상품 ID
 */
export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const endpoint = createPathWithParams(ENDPOINTS.PRODUCT_BY_ID, { productId })

  try {
    const response = await apiGet<ProductDetail>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '상품 상세 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}

/**
 * 오늘의 특가 조회
 */
export const getProductsSpecialprices = async (size: number): Promise<PopularityType[]> => {
  const endpoint = createEndpoint(ENDPOINTS.PRODUCTS_SPECiALPRICES)
  try {
    const response = await apiGet<PopularityType[]>(`${endpoint}?size=${size}`)
    return response.data
  } catch (error) {
    console.error(
      '인기 상품 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}

/**
 * 인기 상품 목록 조회
 */
export const getProductsPopularity = async (size: number): Promise<PopularityType[]> => {
  const endpoint = createEndpoint(ENDPOINTS.POPULARS)
  try {
    const response = await apiGet<PopularityType[]>(`${endpoint}?size=${size}`)
    return response.data
  } catch (error) {
    console.error(
      '인기 상품 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}

/**
 * 상품 목록 조회
 * @param params 검색 파라미터 (모두 선택적)
 */
export const getAllProducts = async (params?: ProductSearchParams): Promise<ProductResponse> => {
  const endpoint = createEndpoint(ENDPOINTS.PRODUCTS)

  try {
    // 파라미터가 있는 경우에만 query string에 추가
    let queryParams = {}

    if (params) {
      // 값이 존재하는 파라미터만 포함
      queryParams = Object.entries(params).reduce((acc, [key, value]) => {
        // 값이 undefined, null, 빈 배열이 아닌 경우에만 포함
        if (value !== undefined && value !== null) {
          if (Array.isArray(value) && value.length > 0) {
            return { ...acc, [key]: value }
          } else if (!Array.isArray(value)) {
            return { ...acc, [key]: value }
          }
        }
        return acc
      }, {})
    }

    const response = await apiGet<ProductResponse>(endpoint, {
      params: queryParams,
    })

    return response.data
  } catch (error) {
    console.error(
      '상품 목록 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
