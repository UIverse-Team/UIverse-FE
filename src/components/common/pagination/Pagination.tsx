'use client '
import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/PagationContainer'

// console.log({ PaginationPrevious })

//totalpage 전체rottn
//currentPage 현재 페이지
//Page 다음 혹은 이전으로 옮길 때 사용하는 이벤트 함수.
//onPageChange: 변경 될 Page를 만드는 useState함수
//limit 보여줄 데이터 갯수
interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  limit: number
}

const Pagination = ({ totalPages, currentPage, onPageChange, limit }: PaginationProps) => {
  //const numPages = Math.max(1, Math.ceil(totalPages / limit)) // 최소 1로 설정
  console.log(onPageChange)
  const validatedTotalPages = Math.max(0, totalPages)
  // const validatedCurrentPage = Math.max(1, Math.min(currentPage, validatedTotalPages || 1))
  // const validatedSiblingCount = Math.max(0, limit)
  console.log(limit)
  // const handlePrev = () => {
  //   if (currentPage > 1) onPageChange(validatedCurrentPage - 1)
  // }

  // const handleNext = () => {
  //   if (currentPage < totalPages) onPageChange(validatedCurrentPage + 1)
  // }
  // item 하나당 하나의 숫자가 들어 가야한다.
  // Link는 페이지션을 직접적으로 클릭했을 때 이동하는 숫자
  // Previous는 이전 값
  // nextvious는 다음 값

  // 페이지네이션이 1개만 존재한다면 페이지네이션을 보여주지 않음.
  if (validatedTotalPages <= 0) {
    return null
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationPrevious />
        <PaginationItem>
          {Array.from({ length: validatedTotalPages }, (_, i) => (
            <PaginationLink
              key={i + 1}
              onClick={() => {
                onPageChange(i + 1)
              }}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
              // href="#"
              className={`border-none rounded-lg p-2 m-0 bg-black text-secondary text-base hover:bg-red-500 hover:cursor-pointer hover:-translate-y-0.5 ${
                currentPage === i + 1
                  ? 'bg-primary font-bold cursor-not-allowed transform-none w-[38px] h-[38px] rounded-4xl text-white'
                  : ''
              }`}
            >
              {i + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationNext />
      </PaginationContent>
    </PaginationContainer>
  )
}

export default Pagination
