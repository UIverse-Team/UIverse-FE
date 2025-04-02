import React from 'react'
import { KeywordType } from '@/hooks/useSearch'
import TextButton from '@/components/common/Button/TextButton'
import ClockIcon from '/public/icons/clock.svg?svgr'
import DeleteIcon from '/public/icons/delete.svg?svgr'

interface RecentSearchListProps {
  recentSearches: KeywordType[]
  onSearch: (term: string) => void
  onDelete: (term: string, e: React.MouseEvent) => void
  onClearAll: () => void
}

const RecentSearchList = ({
  recentSearches,
  onSearch,
  onDelete,
  onClearAll,
}: RecentSearchListProps) => {
  return (
    <div className="w-1/2 flex flex-col gap-2 py-2 px-4">
      <div className="flex justify-between items-center">
        <span className="typo-caption1 text-alternative">최근 검색기록</span>
        <TextButton
          size="sm"
          className="text-alternative underline decoration-1 decoration-solid decoration-alter-line"
          onClick={onClearAll}
        >
          전체삭제
        </TextButton>
      </div>
      <ul>
        {recentSearches.length > 0 ? (
          recentSearches.map((term, index) => (
            <li key={`recent-${index}-${term}`} className="flex justify-between gap-2 py-3">
              <button
                onClick={() => onSearch(term)}
                className="flex flex-1 items-center gap-2"
                type="button"
              >
                <div className="flex items-center justify-center size-6 bg-neutral rounded-full">
                  <ClockIcon className="size-3 text-alternative" />
                </div>
                <span className="typo-body2">{term}</span>
              </button>
              {/* 최근검색기록 삭제 */}
              <button
                onClick={(e) => onDelete(term, e)}
                type="button"
                aria-label={`${term} 검색어 삭제`}
              >
                <DeleteIcon className="size-4 text-assistive" />
              </button>
            </li>
          ))
        ) : (
          <li className="py-3 text-center text-assistive typo-caption1">
            최근 검색 기록이 없습니다
          </li>
        )}
      </ul>
    </div>
  )
}

export default RecentSearchList
