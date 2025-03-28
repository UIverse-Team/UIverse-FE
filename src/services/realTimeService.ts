import httpClient from '@/util/httpClient'

export async function getReaitimeService() {
  try {
    const response = await httpClient.get(`/popular`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
