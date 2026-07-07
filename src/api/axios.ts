import axios, { type AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { ErrorCode } from '~/constants/errorCode'
import type { ApiResponse } from '~/types/api'
import { getOwnerId } from '~/utils/owner'
import type { ApiError } from '~/types/api'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL
})

instance.interceptors.request.use((config) => {
  config.headers['X-Owner-Id'] = getOwnerId()
  return config
})

instance.interceptors.response.use(
  (response) => {
    if (response.status === 204) return null
    const data: ApiResponse<any> = response.data
    return data.result
  },
  (error) => {
    if (!error.response) {
      toast.error('Cannot connect to server. Please try again later.')
      return Promise.reject({
        code: -1,
        message: 'Cannot connect to server'
      })
    }

    const apiError: ApiError = error.response.data
    if (apiError.code !== ErrorCode.VALIDATION_ERROR) {
      toast.error(
        apiError.message || 'An error occurred. Please try again later.'
      )
    }
    return Promise.reject(apiError)
  }
)

interface ApiClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T | null>
}

const axiosClient = instance as unknown as ApiClient

export default axiosClient