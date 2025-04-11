'use client'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { fetchSubCategories } from '@/services/categoryService'
import { Category } from '@/types/category/categoryTypes'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  AccordionContainer,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../common/Accordion/Accordion'

interface SearchCategoryProps {
  categorys: Category[]
}

export const SearchCategoryFilterList = ({ categorys }: SearchCategoryProps) => {
  const queryClient = useQueryClient()
  const [secondLevelCategories, setSecondLevelCategories] = useState<Record<string, Category[]>>({})
  const [thirdLevelCategories, setThirdLevelCategories] = useState<Record<string, Category[]>>({})

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSecondCategory, setSelectedSecondCategory] = useState<string | null>(null)

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

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null) // 이미 선택된 카테고리를 다시 클릭하면 닫힘
    } else {
      setSelectedCategory(categoryId)
      setSelectedSecondCategory(null) // 새 카테고리 선택 시 2차 선택 초기화
    }
  }

  // 2차 카테고리 클릭 핸들러
  const handleSecondCategoryClick = (categoryId: string) => {
    if (selectedSecondCategory === categoryId) {
      setSelectedSecondCategory(null) // 이미 선택된 카테고리를 다시 클릭하면 닫힘
    } else {
      setSelectedSecondCategory(categoryId)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <AccordionContainer type="single" collapsible className="w-full">
        <AccordionItem value="category-header">
          <AccordionTrigger className="py-2 px-4 w-full typo-button1 h-[50px]">
            카테고리
          </AccordionTrigger>
          <AccordionContent>
            <ul className="w-full">
              {categorys.map((category) => (
                <li key={category.id} className="w-full">
                  <div
                    className="py-2 px-4 w-full typo-button2 text-alternative h-[33px] cursor-pointer flex justify-between items-center"
                    onClick={() => handleCategoryClick(String(category.id))}
                  >
                    <span>{category.name}</span>
                    {/* <span>{selectedCategory === String(category.id) ? '▼' : '▶'}</span> */}
                  </div>

                  {/* 1차 카테고리가 선택되었을 때만 2차 카테고리 표시 */}
                  {selectedCategory === String(category.id) && (
                    <ul className="pl-4">
                      {secondLevelCategories[category.id]?.length > 0 ? (
                        secondLevelCategories[category.id].map((secondCategory) => (
                          <li key={secondCategory.id}>
                            <div
                              className="py-2 px-4 w-full typo-button2 h-[33px] text-alternative cursor-pointer flex justify-between items-center"
                              onClick={() => handleSecondCategoryClick(String(secondCategory.id))}
                            >
                              <span>{secondCategory.name}</span>
                              {/* <span>
                                {selectedSecondCategory === String(secondCategory.id) ? '▼' : '▶'}
                              </span> */}
                            </div>

                            {/* 2차 카테고리가 선택되었을 때만 3차 카테고리 표시 */}
                            {selectedSecondCategory === String(secondCategory.id) && (
                              <ul className="pl-4">
                                {thirdLevelCategories[secondCategory.id]?.map((thirdCategory) => (
                                  <li
                                    key={thirdCategory.id}
                                    className="py-2 text-alternative w-full typo-button2 px-4 h-[33px]"
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
