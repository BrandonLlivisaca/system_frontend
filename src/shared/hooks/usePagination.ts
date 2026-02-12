import { useState } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  pageSize?: number
}

export function usePagination({ initialPage = 1, pageSize = 10 }: UsePaginationOptions = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const skip = (currentPage - 1) * pageSize
  const limit = pageSize

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, page))
  }

  const reset = () => setCurrentPage(1)

  return {
    currentPage,
    skip,
    limit,
    pageSize,
    goToPage,
    reset,
  }
}
