import React, { useRef, useState, useEffect } from 'react'
import { useSearch } from '@/hooks/useSearch'
import SearchDropdown from './SearchDropdown'
import SearchIcon from '/public/icons/search.svg?svgr'

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    recentSearches,
    handleSearch,
    handleRecentSearchDelete,
    handleClearAllRecentSearches,
    getSuggestions,
  } = useSearch()

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const suggestions = getSuggestions(searchTerm)

  // 외부 클릭 시 포커스 해제
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  // 검색 제출 핸들러
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    handleSearch(searchTerm)
    inputRef.current?.blur()
    setIsFocused(false)
  }

  // 키워드 선택 핸들러
  const handleKeywordSelect = (term: string): void => {
    handleSearch(term)
    inputRef.current?.blur()
    setIsFocused(false)
  }

  // 검색창 디스플레이 상태 계산
  const isDropdownVisible = isFocused && (!searchTerm || (!!searchTerm && suggestions.length > 0))
  const showRecentSearches = isFocused && !searchTerm
  const showSuggestions = isFocused && !!searchTerm && suggestions.length > 0

  return (
    <div
      ref={wrapperRef}
      className={`relative flex flex-col border-2 border-primary ${
        isDropdownVisible ? 'border-b-gray-75 rounded-t-sm' : 'rounded-sm'
      }`}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-4 py-2 pl-3.5 pr-2.5">
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder="오늘은 무엇을 찾으시나요?"
          className="text-strong typo-body2 outline-none placeholder-assistive flex-grow"
        />
        <button type="submit" aria-label="검색">
          <SearchIcon className="text-primary size-8" />
        </button>
      </form>

      <SearchDropdown
        showRecentSearches={showRecentSearches}
        showSuggestions={showSuggestions}
        // searchTerm={searchTerm}
        recentSearches={recentSearches}
        suggestions={suggestions}
        onSearch={handleKeywordSelect}
        onRecentSearchDelete={handleRecentSearchDelete}
        onClearAllRecentSearches={handleClearAllRecentSearches}
      />
    </div>
  )
}

export default SearchBar
