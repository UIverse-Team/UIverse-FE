'use client'
import Pagination from '@/components/common/pagination/Pagination'
import BreakpointTest from '@/components/design-system/BreakpointTest'
import ButtonTest from '@/components/design-system/ButtonTest'
import ColorPalette from '@/components/design-system/ColorPalette'
import TypoSystem from '@/components/design-system/TypoSystem'
import { useState } from 'react'

export default function Home() {
  //현재 페이지
  const [currentPage, setCurrentPage] = useState(1)
  //보여줄 데이터의 갯수
  const limit = 5
  const totlepages = 30
  const offset = (currentPage - 1) * limit
  console.log(offset)
  return (
    // 임시 메인 페이지
    // 추후 메인페이지 작업 시 수정해도 됨
    <div className="space-y-8">
      <h1 className="typo-title1 text-center">UIverse 디자인 시스템</h1>

      <BreakpointTest />

      <ColorPalette />

      <TypoSystem />

      {/* 공통 버튼 */}
      <ButtonTest />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totlepages}
        onPageChange={setCurrentPage}
        limit={limit}
      />
    </div>
  )
}
