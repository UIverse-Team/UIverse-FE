'use client'

import Image from 'next/image'
import { realTimeData } from '@/mocks/accordionData/accordionData'
import { getTodayDate } from '@/util/getTodayDate'
import RealTimeAccordion from '../product/RealTimeAccordion'
import Signal from 'public/icons/signal.svg'
import useFetchData from '@/hooks/useFetchData'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { KeywordType } from '@/hooks/useSearch'
import { getReaitimeService } from '@/services/realTimeService'

export const RealTimeProductComponent = () => {
  const { year, month, day, hours, period } = getTodayDate()
  const { data } = useFetchData<KeywordType>(QUERY_KEYS.POPULAR, () => getReaitimeService(), {
    refetchInterval: 60 * 60 * 1000, // 1시간 마다 재호출
  })
  console.log(data)
  return (
    <div className=" py-20 flex justify-center items-center flex-col gap-8">
      <div className="py-4 flex flex-col gap-2 justify-center items-center">
        <Image src={Signal} width={36} height={36} alt="오늘의 특가 로고" />
        <h3 className="typo-h2 text-strong">현재 급상승 키워드</h3>
        <span className="text-assistive typo-body3">
          {year}년 {month}월 {day}일 {period} {hours}시, 지혜 사용자들이 많이 검색한 키워드예요!
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <RealTimeAccordion
          items={realTimeData.keywords}
          type="single"
          className="flex flex-col gap-4"
        />
      </div>
    </div>
  )
}
