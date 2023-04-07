export const saveItem = (key: string, payload: any): void => {
  sessionStorage.setItem(key, JSON.stringify(payload))
}

export const getItem = (key: string) => {
  const data = sessionStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }

  return null
}

export const clearStorage = sessionStorage.clear()
