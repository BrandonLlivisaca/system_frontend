export interface PaginationParams {
  skip: number
  limit: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
}
