import React from 'react'
import { KeywordType, RECOMMEND_KEYWORDS, POPULAR_KEYWORDS } from '@/hooks/useSearch'
import RecentSearchesList from './RecentSearchList'
import KeywordsList from './KeywordList'
import SuggestionsList from './SuggestionList'
import RecommendSearchIcon from '/public/icons/recommend-search.svg?svgr'
import PopularIcon from '/public/icons/popular.svg?svgr'

interface SearchDropdownProps {
  showRecentSearches: boolean
  showSuggestions: boolean
  //   searchTerm: string
  recentSearches: KeywordType[]
  suggestions: KeywordType[]
  onSearch: (term: string) => void
  onRecentSearchDelete: (term: string, e: React.MouseEvent) => void
  onClearAllRecentSearches: () => void
}

const SearchDropdown = ({
  showRecentSearches,
  showSuggestions,
  //   searchTerm,
  recentSearches,
  suggestions,
  onSearch,
  onRecentSearchDelete,
  onClearAllRecentSearches,
}: SearchDropdownProps) => {
  if (!showRecentSearches && !showSuggestions) return null

  return (
    <div className="absolute top-full -left-[2px] w-[calc(100%+4px)] bg-white border-2 border-primary border-t-0 rounded-b-sm mt-[1px] z-10">
      {showRecentSearches && (
        <div className="flex py-2.5">
          {/* 최근 검색기록 */}
          <RecentSearchesList
            recentSearches={recentSearches}
            onSearch={onSearch}
            onDelete={onRecentSearchDelete}
            onClearAll={onClearAllRecentSearches}
          />

          <div className="w-1/2 space-y-4 px-4">
            {/* 추천 검색어 */}
            <KeywordsList
              title="추천 검색어"
              icon={<RecommendSearchIcon className="size-5" />}
              keywords={RECOMMEND_KEYWORDS}
              onSelect={onSearch}
              variant="primary"
            />

            {/* 인기 검색어 */}
            <KeywordsList
              title="인기 검색어"
              icon={<PopularIcon className="size-5" />}
              keywords={POPULAR_KEYWORDS}
              onSelect={onSearch}
              variant="secondary"
              subtitle="03.12 기준"
            />
          </div>
        </div>
      )}

      {/* 검색어 미리보기 영역 */}
      {showSuggestions && <SuggestionsList suggestions={suggestions} onSelect={onSearch} />}
    </div>
  )
}

export default SearchDropdown
