export interface ApiResponse<T> {
  code: number
  message: string
  result: T
}

export interface ValidationError {
  field: string
  message: string
}

export interface ApiError {
  code: number
  message: string
  result?: any;
}
