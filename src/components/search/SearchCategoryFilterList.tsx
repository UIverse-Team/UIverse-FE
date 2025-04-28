'use client'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { fetchSubCategories } from '@/services/categoryService'
import { Category } from '@/types/category/categoryTypes'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  AccordionContainer,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../common/Accordion/Accordion'

interface SearchCategoryProps {
  categorys: Category[]
  onCategorySelect?: (categoryId: string | null) => void
}

export const SearchCategoryFilterList = ({ categorys, onCategorySelect }: SearchCategoryProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [secondLevelCategories, setSecondLevelCategories] = useState<Record<string, Category[]>>({})
  const [thirdLevelCategories, setThirdLevelCategories] = useState<Record<string, Category[]>>({})

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSecondCategory, setSelectedSecondCategory] = useState<string | null>(null)

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [selectedCategoryLevel, setSelectedCategoryLevel] = useState<number | null>(null)

  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoryId')
    if (categoryFromUrl) {
      setSelectedCategoryId(categoryFromUrl)

      // 1단계 카테고리인 경우
      const rootCategory = categorys.find((cat) => String(cat.id) === categoryFromUrl)
      if (rootCategory) {
        setSelectedCategory(categoryFromUrl)
        setSelectedCategoryLevel(1)
        return
      }

      // 2단계 또는 3단계 카테고리인 경우 - 부모 관계 찾기
      for (const rootCat of categorys) {
        const secondLevel = secondLevelCategories[rootCat.id] || []
        const isSecondLevel = secondLevel.some((cat) => String(cat.id) === categoryFromUrl)

        if (isSecondLevel) {
          setSelectedCategory(String(rootCat.id))
          setSelectedSecondCategory(categoryFromUrl)
          setSelectedCategoryLevel(2)
          return
        }

        // 3단계 확인
        for (const secondCat of secondLevel) {
          const thirdLevel = thirdLevelCategories[secondCat.id] || []
          const isThirdLevel = thirdLevel.some((cat) => String(cat.id) === categoryFromUrl)

          if (isThirdLevel) {
            setSelectedCategory(String(rootCat.id))
            setSelectedSecondCategory(String(secondCat.id))
            setSelectedCategoryLevel(3)
            return
          }
        }
      }
    }
  }, [searchParams, categorys, secondLevelCategories, thirdLevelCategories])

  // 모든 카테고리 데이터를 한 번에 가져와서 캐시에 저장
  useEffect(() => {
    const fetchAllCategories = async () => {
      if (categorys.length > 0) {
        try {
          const secondLevelData: Record<string, Category[]> = {}
          const thirdLevelData: Record<string, Category[]> = {}

          // 모든 루트 카테고리의 서브 카테고리(2뎁스, 3뎁스) 데이터를 한번에 가져와 캐시에 저장
          await Promise.all(
            categorys.map(async (rootCategory) => {
              // 2뎁스 카테고리 데이터 가져오기
              const secondLevel = await fetchSubCategories(rootCategory.id)
              secondLevelData[rootCategory.id] = secondLevel || []

              // 2뎁스 데이터를 쿼리 캐시에 직접 저장
              queryClient.setQueryData(QUERY_KEYS.SUB_CATEGORIES(rootCategory.id), secondLevel)

              // 3뎁스 카테고리 데이터 가져오기 및 캐시에 저장
              if (secondLevel && secondLevel.length > 0) {
                await Promise.all(
                  secondLevel.map(async (secondCategory) => {
                    const thirdLevel = await fetchSubCategories(secondCategory.id)
                    thirdLevelData[secondCategory.id] = thirdLevel || []
                    // 3뎁스 데이터를 쿼리 캐시에 직접 저장
                    queryClient.setQueryData(
                      QUERY_KEYS.SUB_CATEGORIES(secondCategory.id),
                      thirdLevel,
                    )
                  }),
                )
              }
            }),
          )
          setSecondLevelCategories(secondLevelData)
          setThirdLevelCategories(thirdLevelData)
        } catch (error) {
          console.error('Error fetching categories:', error)
        }
      }
    }

    fetchAllCategories()
  }, [categorys, queryClient])

  // 1차 카테고리 클릭 핸들러 - UI 트리 구조만 담당
  const handleCategoryClick = (categoryId: string) => {
    // UI 트리 구조 처리
    if (selectedCategory === categoryId) {
      setSelectedCategory(null) // 이미 선택된 카테고리를 다시 클릭하면 닫힘

      // 1차
      // 1차 카테고리를 닫을 때, 해당 카테고리가 선택되어 있었다면 선택 해제
      if (selectedCategoryId === categoryId && selectedCategoryLevel === 1) {
        setSelectedCategoryId(null)
        setSelectedCategoryLevel(null)
        if (onCategorySelect) {
          onCategorySelect(null)
        }
      }
    } else {
      setSelectedCategory(categoryId)
      setSelectedSecondCategory(null) // 새 카테고리 선택 시 2차 선택 초기화

      // 1차 카테고리 선택 상태 업데이트
      setSelectedCategoryId(categoryId)
      setSelectedCategoryLevel(1)

      // 부모 컴포넌트에 카테고리 선택 알림 (쿼리 스트링 업데이트는 하지 않음)
      if (onCategorySelect) {
        onCategorySelect(categoryId)
      }
    }
  }

  // 2차 카테고리 클릭 핸들러 - UI 트리 구조만 담당
  const handleSecondCategoryClick = (categoryId: string) => {
    // UI 트리 구조 처리
    if (selectedSecondCategory === categoryId) {
      setSelectedSecondCategory(null) // 이미 선택된 카테고리를 다시 클릭하면 닫힘

      // 2차 카테고리를 닫을 때, 해당 카테고리가 선택되어 있었다면 선택 해제
      if (selectedCategoryId === categoryId && selectedCategoryLevel === 2) {
        setSelectedCategoryId(null)
        setSelectedCategoryLevel(null)
        if (onCategorySelect) {
          onCategorySelect(null)
        }
      }
    } else {
      setSelectedSecondCategory(categoryId)

      // 2차 카테고리 선택 상태 업데이트
      setSelectedCategoryId(categoryId)
      setSelectedCategoryLevel(2)

      // 부모 컴포넌트에 카테고리 선택 알림 (쿼리 스트링 업데이트는 하지 않음)
      if (onCategorySelect) {
        onCategorySelect(categoryId)
      }
    }
  }

  // 3차 카테고리 클릭 핸들러 - 카테고리 선택 및 쿼리 스트링 업데이트
  const handleThirdCategoryClick = (categoryId: string) => {
    // 이미 선택된 3차 카테고리를 다시 클릭한 경우 선택 해제
    if (selectedCategoryId === categoryId && selectedCategoryLevel === 3) {
      setSelectedCategoryId(null)
      setSelectedCategoryLevel(null)

      // 부모 컴포넌트에 선택 해제 알림
      if (onCategorySelect) {
        onCategorySelect(null)
      }

      // URL에서 category 쿼리 파라미터 제거
      updateQueryString(null)
    } else {
      // 새로운 3차 카테고리 선택
      setSelectedCategoryId(categoryId)
      setSelectedCategoryLevel(3)

      // 부모 컴포넌트에 카테고리 선택 알림
      if (onCategorySelect) {
        onCategorySelect(categoryId)
      }

      // 3차 카테고리만 URL 쿼리 스트링에 추가
      updateQueryString(categoryId)
    }
  }

  const updateQueryString = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId) {
      params.set('categoryId', categoryId)
    } else {
      params.delete('categoryId')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-1">
      <AccordionContainer
        type="single"
        collapsible
        className="w-full"
        defaultValue="category-header"
      >
        <AccordionItem value="category-header">
          <AccordionTrigger className="py-2 px-4 w-full typo-button1 h-[50px]">
            카테고리
          </AccordionTrigger>
          <AccordionContent>
            <ul className="w-full">
              {categorys.map((category) => (
                <li key={category.id} className="w-full">
                  <div
                    className={`py-2 px-4 w-full typo-button2 text-alternative h-[33px] cursor-pointer flex justify-between items-center ${
                      selectedCategoryId === String(category.id) ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleCategoryClick(String(category.id))}
                  >
                    <span>{category.name}</span>
                  </div>

                  {/* 1차 카테고리가 선택되었을 때만 2차 카테고리 표시 */}
                  {selectedCategory === String(category.id) && (
                    <ul className="pl-4">
                      {secondLevelCategories[category.id]?.length > 0 ? (
                        secondLevelCategories[category.id].map((secondCategory) => (
                          <li key={secondCategory.id}>
                            <div
                              className={`py-2 px-4 w-full typo-button2 h-[33px] text-alternative cursor-pointer flex justify-between items-center ${
                                selectedCategoryId === String(secondCategory.id)
                                  ? 'bg-gray-100'
                                  : ''
                              }`}
                              onClick={() => handleSecondCategoryClick(String(secondCategory.id))}
                            >
                              <span>{secondCategory.name}</span>
                            </div>

                            {/* 2차 카테고리가 선택되었을 때만 3차 카테고리 표시 */}
                            {selectedSecondCategory === String(secondCategory.id) && (
                              <ul className="pl-4">
                                {thirdLevelCategories[secondCategory.id]?.map((thirdCategory) => (
                                  <li
                                    key={thirdCategory.id}
                                    className={`py-2 text-alternative w-full typo-button2 px-4 h-[33px] cursor-pointer ${
                                      selectedCategoryId === String(thirdCategory.id)
                                        ? 'bg-gray-100'
                                        : ''
                                    }`}
                                    onClick={() =>
                                      handleThirdCategoryClick(String(thirdCategory.id))
                                    }
                                  >
                                    {thirdCategory.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))
                      ) : (
                        <li className="pl-4 py-2">하위 카테고리가 없습니다.</li>
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </AccordionContainer>
    </div>
  )
}
