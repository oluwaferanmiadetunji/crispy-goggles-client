export const saveItem = (key: string, payload: any): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const getItem = (key: string) => {
  const data = localStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }

  return null
}

export const clearStorage = () => localStorage.clear()
