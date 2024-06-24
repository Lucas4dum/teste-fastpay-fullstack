import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(
  (config) => {
    const userStorage = sessionStorage.getItem('user-storage')
    const user = userStorage ? JSON.parse(userStorage) : null
    const token = user?.state?.user?.access_token
    const localToken = localStorage.getItem('token')

    if (token || localToken) {
      config.headers.Authorization = `Bearer ${token || localToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/') {
      sessionStorage.removeItem('user-storage')
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)

export { api }
