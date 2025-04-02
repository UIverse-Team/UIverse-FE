export const getCartItem = (key: string) => {
  return localStorage.getItem(key)
}

export const saveCartItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const removeCartItem = (key: string) => {
  localStorage.remove(key)
}

export const allRemoveCartItem = () => {
  localStorage.clear()
}
