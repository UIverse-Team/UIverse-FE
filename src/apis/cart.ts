import HttpClient from './httpClient'

export const deleteCartItems = async (productId: number) => {
  console.log(productId)
  await HttpClient.delete(`/guestcarts/${productId}`)
}
