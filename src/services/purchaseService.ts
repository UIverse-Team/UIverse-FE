import httpClient from '@/util/httpClient'

export async function postPurchaseService() {
  try {
    const response = await httpClient.post(`/orderGuest/instant`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function postUserPurchaseService() {
  try {
    const response = await httpClient.post(`/orderGuest`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
