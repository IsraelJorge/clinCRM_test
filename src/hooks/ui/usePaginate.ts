import { useEffect, useState } from 'react'

type Paginate<T> = {
  data: T[]
  pageSize?: number
}

export const usePaginate = <T>({ data = [], pageSize = 10 }: Paginate<T>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / pageSize)

  const pagedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  const handlePageChange = (page: string) => {
    setCurrentPage(Number(page))
  }

  useEffect(() => {
    if (pagedData.length === 0 && currentPage > 1) {
      setCurrentPage(1)
    }
  }, [pagedData.length])

  return {
    pagedData,
    page: currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
  }
}
