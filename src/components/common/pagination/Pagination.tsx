'use client'

import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/PagationContainer'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
  limit: number
}

const Pagination = ({ totalPages, currentPage, limit }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    if (page < 0 || page > totalPages) return // 범위를 벗어나면 실행 안 함
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    params.set('limit', String(limit))
    router.push(`?${params.toString()}`)
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationPrevious
          onClick={() => goToPage(currentPage - 1)}
          aria-disabled={currentPage <= 0}
          className={`cursor-pointer size-[38px] flex justify-center items-center rounded text-alternative ${
            currentPage <= 0 ? 'pointer-events-none opacity-50' : ''
          }`}
        />

        {/* 페이지 번호 */}
        <div className="flex gap-2 mx-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => goToPage(i)}
                aria-current={currentPage === i ? 'page' : undefined}
                className={`typo-button1 size-[38px] flex justify-center items-center text-assistive cursor-pointer ${
                  currentPage === i ? 'text-primary cursor-not-allowed' : ''
                }`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        {/* 다음 버튼 */}
        <PaginationNext
          onClick={() => goToPage(currentPage + 1)}
          aria-disabled={currentPage >= totalPages}
          className={`cursor-pointer size-[38px] flex justify-center items-center rounded text-alternative ${
            currentPage >= totalPages - 1 ? 'pointer-events-none opacity-50' : ''
          }`}
        />
      </PaginationContent>
    </PaginationContainer>
  )
}

export default Pagination
