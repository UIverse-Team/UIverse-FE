import httpClient from '@/util/httpClient'

//상품 상세
// server copmonent
export async function getProductDetail(productId: number) {
  try {
    const response = await httpClient.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

//인기 상품
//server component
export const getProductsPopularity = async () => {
  try {
    const response = await httpClient.get(`/products/popular`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

//전체 상품 검색 조회
//keyword 검색 이름
//size
export async function getAllProducts() {
  try {
    const response = await httpClient.get(`/products`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
