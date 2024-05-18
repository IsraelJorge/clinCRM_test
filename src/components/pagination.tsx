import {
  PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export type PaginationProps = {
  totalPages: number | undefined
  page: number | string | undefined
  onPaginate: (page: string) => void
}

const MAX_BUTTONS = 9
const SIDE_WIDTH = 2 // MAX_BUTTONS < 9 ? 1 : 2

export function Pagination({ onPaginate, page, totalPages }: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null
  const currentPage = Number(page ?? '1')

  const range = (start: number, end: number) => {
    return Array.from(Array(end - start + 1), (_, i) => i + start)
  }

  const getPageList = () => {
    const leftWidth = (MAX_BUTTONS - SIDE_WIDTH * 2 - 3) >> 1
    const rightWidth = (MAX_BUTTONS - SIDE_WIDTH * 2 - 2) >> 1

    if (totalPages <= MAX_BUTTONS) {
      return range(1, totalPages)
    }

    if (currentPage <= MAX_BUTTONS - SIDE_WIDTH - 1 - rightWidth) {
      return range(1, MAX_BUTTONS - SIDE_WIDTH - 1).concat(
        0,
        range(totalPages - SIDE_WIDTH + 1, totalPages),
      )
    }

    if (currentPage >= totalPages - SIDE_WIDTH - 1 - rightWidth) {
      return range(1, SIDE_WIDTH).concat(
        0,
        range(totalPages - SIDE_WIDTH - 1 - rightWidth - leftWidth, totalPages),
      )
    }

    return range(1, SIDE_WIDTH).concat(
      0,
      range(currentPage - leftWidth, currentPage + rightWidth),
      0,
      range(totalPages - SIDE_WIDTH + 1, totalPages),
    )
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <PaginationRoot className="justify-end py-4">
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPaginate(String(currentPage - 1))}
            />
          </PaginationItem>
        )}

        {getPageList().map((pageNumber, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationButton
                className={cn({ 'pointer-events-none': pageNumber === 0 })}
                isActive={pageNumber === currentPage}
                onClick={() => onPaginate(pageNumber.toString())}
              >
                {pageNumber || <PaginationEllipsis />}
              </PaginationButton>
            </PaginationItem>
          )
        })}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => onPaginate(String(currentPage + 1))}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  )
}
