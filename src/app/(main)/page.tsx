'use client'

import Pagination from '@/components/common/pagination/Pagination'
import BreakpointTest from '@/components/design-system/BreakpointTest'
import ButtonTest from '@/components/design-system/ButtonTest'
import CheckboxTest from '@/components/design-system/CheckboxTest'
import ColorPalette from '@/components/design-system/ColorPalette'
import TypoSystem from '@/components/design-system/TypoSystem'
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb'
import { useState } from 'react'
import RadioTest from '@/components/design-system/RadioTest'
import TabTest from '@/components/design-system/TabTest'

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

      {/* 공통 체크박스 */}
      <CheckboxTest />

      {/* 공통 라디오버튼 */}
      <RadioTest />

      {/* 탭 */}
      <TabTest />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totlepages}
        onPageChange={setCurrentPage}
        limit={limit}
      />
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings', href: '/dashboard/settings' },
          { label: 'Profile' },
        ]}
      />
    </div>
  )
}
