import React, { useState, useEffect } from 'react'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localstorageUtil'
import { RECENT_SEARCH_LOCAL_STORAGE_KEY } from '@/constants/localStorageKey'

// 검색 키워드 타입
export type KeywordType = string

// 검색어 샘플 데이터 상수화 (실제로는 별도 파일로 분리 가능)
export const SAMPLE_SUGGESTIONS: KeywordType[] = [
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

// 추천 검색어와 인기 검색어 상수화 (실제로는 별도 파일로 분리 가능)
export const RECOMMEND_KEYWORDS: KeywordType[] = [
  '트렌디한 운동화',
  '프로틴 음료',
  '미니멀한 가방',
  '블루투스 이어폰',
  '스마트워치',
  '영애네옷장',
  '명규네과일',
]

// 인기 검색어와 추천 검색어가 동일하므로 참조
export const POPULAR_KEYWORDS: KeywordType[] = RECOMMEND_KEYWORDS

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [recentSearches, setRecentSearches] = useState<KeywordType[]>([])

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

  /**
   * 검색어 미리보기 데이터를 가져오는 함수
   * @param term 검색어
   * @returns 필터링된 검색어 배열
   */
  const getSuggestions = (term: string): KeywordType[] => {
    if (!term) return []
    return SAMPLE_SUGGESTIONS.filter((item) => item.toLowerCase().includes(term.toLowerCase()))
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

    // 검색어 설정
    setSearchTerm(trimmedTerm)

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

  return {
    searchTerm,
    setSearchTerm,
    recentSearches,
    handleSearch,
    handleRecentSearchDelete,
    handleClearAllRecentSearches,
    getSuggestions,
  }
}
