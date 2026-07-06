import axios from 'axios'
import { toast } from 'react-toastify'
import { ErrorCode } from '~/constants/errorCode'
import type { ApiResponse } from '~/types/api'
import { getOwnerId } from '~/utils/owner'
import type { ApiError } from '~/types/api'

const axiosClient = axios.create({
  baseURL: 'http://localhost:1122'
})

axiosClient.interceptors.request.use((config) => {
  config.headers['X-Owner-Id'] = getOwnerId()
  return config
})

axiosClient.interceptors.response.use(
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
        message: "Cannot connect to server",
      })
    }

    const apiError: ApiError = error.response.data
    if (apiError.code !== ErrorCode.VALIDATION_ERROR) {
        toast.error(apiError.message || 'An error occurred. Please try again later.')
    }
    return Promise.reject(apiError)
  }
)

export default axiosClient
