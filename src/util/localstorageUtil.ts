export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`)
  }
}

export function setLocalStorageItemWithExpiry<T>(key: string, value: T, ttl: number): void {
  const now = new Date()

  const item = {
    value: value,
    expiry: now.getTime() + ttl * 1000, // ttl은 초 단위
  }

  try {
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`)
  }
}

export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key)
    return serializedValue ? (JSON.parse(serializedValue) as T) : null
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`)
    return null
  }
}

export function getLocalStorageItemWithExpiry<T>(key: string): T | null {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // 만료 시간 체크
  if (now.getTime() > item.expiry) {
    console.log('Storing item:', { key, item })
    localStorage.removeItem(key)
    return null
  }

  return item.value
}

export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`)
  }
}

export function clearStorage(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`)
  }
}
