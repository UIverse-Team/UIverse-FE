import React, { useState, useRef, useEffect } from 'react'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localstorageUtil'
import { RECENT_SEARCH_LOCAL_STORAGE_KEY } from '@/constants/localStorageKey'
import TextButton from '@/components/common/Button/TextButton'
import Chip from '@/components/common/Chip/Chip'
import ClockIcon from '/public/icons/clock.svg?svgr'
import SearchIcon from '/public/icons/search.svg?svgr'
import DeleteIcon from '/public/icons/delete.svg?svgr'
import RecommendSearchIcon from '/public/icons/recommend-search.svg?svgr'
import PopularIcon from '/public/icons/popular.svg?svgr'

// 검색 키워드 타입
type KeywordType = string

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [recentSearches, setRecentSearches] = useState<KeywordType[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 추천 검색어와 인기 검색어 상수화
  const RECOMMEND_KEYWORDS: KeywordType[] = [
    '트렌디한 운동화',
    '프로틴 음료',
    '미니멀한 가방',
    '블루투스 이어폰',
    '스마트워치',
    '영애네옷장',
    '명규네과일',
  ]

  // 인기 검색어와 추천 검색어가 동일하므로 참조
  const POPULAR_KEYWORDS: KeywordType[] = RECOMMEND_KEYWORDS

  // 검색어 샘플 데이터 상수화
  const SAMPLE_SUGGESTIONS: KeywordType[] = [
    '아이폰 15',
    '아이폰 14',
    '아이폰 케이스',
    '아이폰 충전기',
    '갤럭시 S24',
    '갤럭시 탭',
    '갤럭시 워치',
    '맥북 에어',
    '맥북 프로',
    '맥북 충전기',
  ]

  /**
   * 검색어 미리보기 데이터를 가져오는 함수
   * @param term 검색어
   * @returns 필터링된 검색어 배열
   */
  const getSuggestions = (term: string): KeywordType[] => {
    if (!term) return []
    return SAMPLE_SUGGESTIONS.filter((item) => item.toLowerCase().includes(term.toLowerCase()))
  }

  const suggestions = getSuggestions(searchTerm)

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    try {
      const localSearchItems = getLocalStorageItem<KeywordType[]>(RECENT_SEARCH_LOCAL_STORAGE_KEY)
      if (Array.isArray(localSearchItems)) {
        setRecentSearches(localSearchItems)
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error)
      setRecentSearches([])
    }
  }, [])

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

  // 최근 검색어 저장 함수
  const saveRecentSearch = (term: string): void => {
    const trimmedTerm = term.trim()
    if (!trimmedTerm) return

    // 이미 존재하는 검색어라면 제거 후 맨 앞에 추가
    const updatedSearches = recentSearches.filter((item) => item !== trimmedTerm)
    updatedSearches.unshift(trimmedTerm)

    // 최대 10개까지만 저장
    const limitedSearches = updatedSearches.slice(0, 10)

    // 상태 및 로컬스토리지 업데이트
    setRecentSearches(limitedSearches)
    setLocalStorageItem(RECENT_SEARCH_LOCAL_STORAGE_KEY, limitedSearches)
  }

  // 검색 실행 함수
  const handleSearch = (term: string): void => {
    const trimmedTerm = term.trim()
    if (!trimmedTerm) return

    // 검색어 저장
    saveRecentSearch(trimmedTerm)

    // 검색어 설정 및 포커스 해제
    setSearchTerm(trimmedTerm)
    inputRef.current?.blur()
    setIsFocused(false)

    console.log('검색어:', trimmedTerm)
  }

  // 특정 최근 검색어 삭제
  const handleRecentSearchDelete = (term: string, e: React.MouseEvent): void => {
    e.stopPropagation()
    const updatedSearches = recentSearches.filter((item) => item !== term)
    setRecentSearches(updatedSearches)
    setLocalStorageItem(RECENT_SEARCH_LOCAL_STORAGE_KEY, updatedSearches)
  }

  // 최근 검색어 전체 삭제
  const handleClearAllRecentSearches = (): void => {
    setRecentSearches([])
    setLocalStorageItem(RECENT_SEARCH_LOCAL_STORAGE_KEY, [])
  }

  // 검색창 디스플레이 상태 계산
  const isDropdownVisible = isFocused && (!searchTerm || (searchTerm && suggestions.length > 0))
  const showRecentSearches = isFocused && !searchTerm
  const showSuggestions = isFocused && searchTerm && suggestions.length > 0

  return (
    <div
      ref={wrapperRef}
      className={`relative flex flex-col border-2 border-primary ${
        isDropdownVisible ? 'border-b-gray-75 rounded-t-sm' : 'rounded-sm'
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(searchTerm)
        }}
        className="flex items-center gap-4 py-2 pl-3.5 pr-2.5"
      >
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

      {/* 검색 input focus 시 나오는 최근 검색어 영역 */}
      {showRecentSearches && (
        <div className="absolute top-full -left-[2px] w-[calc(100%+4px)] bg-white border-2 border-primary border-t-0 rounded-b-sm mt-[1px] z-10">
          <div className="flex py-2.5">
            {/* 최근 검색기록 */}
            <div className="w-1/2 flex flex-col gap-2 py-2 px-4">
              <div className="flex justify-between items-center">
                <span className="typo-caption1 text-alternative">최근 검색기록</span>
                <TextButton
                  size="sm"
                  className="text-alternative underline decoration-1 decoration-solid decoration-alter-line"
                  onClick={handleClearAllRecentSearches}
                >
                  전체삭제
                </TextButton>
              </div>
              <ul>
                {recentSearches.length > 0 ? (
                  recentSearches.map((term, index) => (
                    <li key={`recent-${index}-${term}`} className="flex justify-between gap-2 py-3">
                      <button
                        onClick={() => handleSearch(term)}
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
                        onClick={(e) => handleRecentSearchDelete(term, e)}
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

            <div className="w-1/2 space-y-4 px-4">
              {/* 추천 검색어  */}
              <div className="space-y-3 py-2">
                <span className="flex items-center gap-1 typo-button2 text-primary">
                  <RecommendSearchIcon className="size-5" />
                  추천 검색어
                </span>
                <ul className="flex flex-wrap gap-2 py-2">
                  {RECOMMEND_KEYWORDS.map((recommend, idx) => (
                    <li key={`recommend-${idx}-${recommend}`}>
                      <Chip onClick={() => handleSearch(recommend)}>{recommend}</Chip>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 인기 검색어  */}
              <div className="space-y-3 py-2">
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1 typo-button2 text-alternative">
                    <PopularIcon className="size-5" />
                    인기 검색어
                  </span>
                  <span className="typo-caption1 text-assistive">03.12 기준</span>
                </span>
                <ul className="flex flex-wrap gap-2 py-2">
                  {POPULAR_KEYWORDS.map((popular, idx) => (
                    <li key={`popular-${idx}-${popular}`}>
                      <Chip variant="secondary" onClick={() => handleSearch(popular)}>
                        {popular}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 검색 input에 typing 시 나오는 검색어 미리보기 영역 */}
      {showSuggestions && (
        <div className="absolute top-full -left-[2px] w-[calc(100%+4px)] bg-white border-2 border-primary border-t-0 rounded-b-sm mt-[1px] z-10">
          <ul className="p-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={`suggestion-${index}-${suggestion}`}
                className="py-2 px-2 hover:bg-neutral rounded cursor-pointer"
              >
                <button
                  onClick={() => handleSearch(suggestion)}
                  className="flex items-center w-full"
                  type="button"
                >
                  <SearchIcon className="size-5 mr-2 text-assistive" />
                  <span className="typo-body2">{suggestion}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
