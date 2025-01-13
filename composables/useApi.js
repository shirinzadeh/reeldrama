// composables/api.js

export function useApi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl
  // const { authToken } = useAuthStore()

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  function createUrl(endpoint) {
    return `${baseUrl}${endpoint}`
  }

  function getHeaders(customHeaders = {}) {
    const headers = { ...commonHeaders, ...customHeaders }
    // if (authToken) {
    //   headers['Authorization'] = `Bearer ${authToken}`
    // }
    return headers
  }

  async function fetch(endpoint, options = {}) {
    const { method = 'GET', body, query, headers, ...restOptions } = options
    const { data, status, error } = await useFetch(createUrl(endpoint), {
      method,
      body,
      query,
      headers: getHeaders(headers),
      credentials: 'include',
      ...restOptions,
    })
    return { data: data.value, status, error: error?.value }
  }

  function asyncData(key, endpoint, options = {}) {
    const { method = 'GET', body, query, headers, ...restOptions } = options
    return useAsyncData(key, () => $fetch(createUrl(endpoint), {
      method,
      body,
      query,
      headers: getHeaders(headers),
      credentials: 'include',
      ...restOptions
    }))
  }

  async function request(endpoint, options = {}) {
    const { method = 'GET', body, query, headers, showToastr = true, ...restOptions } = options
    try {
      const response = await $fetch(createUrl(endpoint), {
        method,
        body,
        query,
        headers: getHeaders(headers),
        credentials: 'include',
        ...restOptions
      })
      if (import.meta.client && response?.message && showToastr) {
        const { $toast } = useNuxtApp()
        $toast.success(response.message)
      }
      return response
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  function handleApiError(error) {
    let errorMessage = 'An unexpected error occurred'
    const { status, response } = error

    if (response) {
      if (status === 422) {
        errorMessage = response._data?.detail[0].msg
      } else if (status === 401) {
        errorMessage = response._data.detail
      } else if (status === 403) {
        errorMessage = response._data?.detail
      } else {
        errorMessage = response._data?.detail || response._data?.message || error.message
      }
    } else if (error.request) {
      errorMessage = 'No response received from the server'
    } else if (error.message) {
      errorMessage = error.message
    }

    if (import.meta.client) {
      const { $toast } = useNuxtApp()
      $toast.error(`${errorMessage}`)
    }
  }

  return {
    fetch,
    asyncData,
    request,
    createUrl,
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, options) => request(endpoint, { ...options, method: 'POST' }),
    patch: (endpoint, options) => request(endpoint, { ...options, method: 'PATCH' }),
    put: (endpoint, options) => request(endpoint, { ...options, method: 'PUT' }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  }
}
