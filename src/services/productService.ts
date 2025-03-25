import httpClient from '@/util/httpClient'

export async function getProductDetail(productId: number) {
  try {
    const response = await httpClient.get(`products/${productId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
