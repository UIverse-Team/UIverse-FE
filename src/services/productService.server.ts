import { createServerHttpClient } from '@/libs/axios/serverClient'
import { ProductResponse, PopularityType } from '@/types/Product/productsType'
import { ProductDetail } from '@/types/Product/productDetailType'
import { createEndpoint, createPathWithParams } from '@/libs/axios/endPoints'

const ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:productId',
  POPULARS: '/products/popular',
}

/**
 * 상품 상세 조회
 * @param productId 상품 ID
 */
export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const endpoint = createPathWithParams(ENDPOINTS.PRODUCT_BY_ID, { productId })

  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<ProductDetail>(endpoint)

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
 * 인기 상품 목록 조회
 */
export const getProductsPopularity = async (): Promise<PopularityType[]> => {
  const endpoint = createEndpoint(ENDPOINTS.POPULARS)

  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<PopularityType[]>(endpoint)

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
 */
export const getAllProducts = async (): Promise<ProductResponse> => {
  const endpoint = createEndpoint(ENDPOINTS.PRODUCTS)

  try {
    const serverClient = createServerHttpClient()
    const response = await (await serverClient).get<ProductResponse>(endpoint)

    return response.data
  } catch (error) {
    console.error(
      '상품 목록 조회 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    throw error
  }
}
