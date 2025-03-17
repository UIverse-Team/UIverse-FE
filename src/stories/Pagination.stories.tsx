import type { Meta } from '@storybook/react'
import { useState } from 'react'
import React from 'react'

// Updated CustomPagination component
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}) => {
  // Generate array of page numbers without ellipsis
  const getPageNumbers = () => {
    // Generate all page numbers
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center space-x-1">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex items-center justify-center rounded-full text-sm font-medium h-10 w-10 ${
          currentPage === 1 ? 'opacity-50 ' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-label="Go to previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page) => (
        <button
          key={`page-${page}`}
          onClick={() => onPageChange(page)}
          className={`inline-flex items-center justify-center rounded-full text-sm font-medium h-10 w-10 ${
            currentPage === page
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center justify-center rounded-full text-sm font-medium h-10 w-10 ${
          currentPage === totalPages ? 'opacity-50 ' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-label="Go to next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  )
}

// Create Storybook meta
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    onPageChange: {
      action: 'page changed',
      description: '페이지 변경 시 호출되는 콜백 함수',
    },
  },
}

export default meta

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    console.log(`페이지가 ${page}로 변경되었습니다`)
  }

  return (
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
  )
}

export const ManyPages = () => {
  const [page, setPage] = useState(5)
  const totalPages = 20

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center mb-4">
        <p>현재 페이지: {page}</p>
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </div>
  )
}
