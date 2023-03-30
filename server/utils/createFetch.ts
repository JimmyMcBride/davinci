export const createFetch = (baseUrl: string, defaultOptions: RequestInit = {}) => {
  return (path: string, options?: RequestInit) => {
    const mergedOptions = { ...defaultOptions, ...options }
    const url = `${baseUrl}${path}`
    return fetch(url, mergedOptions)
  }
}
