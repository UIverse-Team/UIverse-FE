export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`)
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key)
    return serializedValue ? (JSON.parse(serializedValue) as T) : null
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`)
    return null
  }
}

export function removeItem(key: string): void {
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
