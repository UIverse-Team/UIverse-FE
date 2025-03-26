import httpClient from '@/util/httpClient'

//상품 상세
export async function getProductDetail(productId: number) {
  try {
    const response = await httpClient.get(`products/${productId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

//인기 상품
export const getProductsPopularity = async () => {
  try {
    const response = await httpClient.get(`/products/popular`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getAllProducts() {
  try {
    const response = await httpClient.get(`${process.env.SERVER_API_V1_BASE_URL}/products`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
