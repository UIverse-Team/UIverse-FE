import httpClient from '@/util/httpClient'
import axios from 'axios'

export async function getProductDetail(productId: number) {
  try {
    const response = await httpClient.get(`products/${productId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getAllProducts() {
  try {
    // const response = await httpClient.get('products')
    // 추후 실제 api 서버 주소로 호출하는 것으르 수정 필요
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
