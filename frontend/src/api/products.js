import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const fetchProducts = () => api.get('/')
export const createProduct = (payload) => api.post('/', payload)
export const updateProduct = (id, payload) => api.patch(`/${id}`, payload)
export const deleteProduct = (id) => api.delete(`/${id}`)

export default api
