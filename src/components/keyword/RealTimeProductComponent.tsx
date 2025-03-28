'use client'
import { accordionData } from '@/mocks/accordionData/accordionData'
import { getTodayDate } from '@/util/getTodayDate'
import Accordion from '@/components/common/Accordion/Accordion'
import Image from 'next/image'
import Signal from 'public/icons/signal.svg'

export const RealTimeProductComponent = () => {
  const { year, month, day, hours, period } = getTodayDate()

  return (
    <div className=" py-20 flex justify-center items-center  flex-col gap-8">
      <div className="py-4 flex flex-col gap-2 justify-center items-center">
        <Image src={Signal} width={36} height={36} alt="오늘의 특가 로고" />
        <h3 className="typo-h2 text-strong">현재 급상승 키워드</h3>
        <span className="text-assistive typo-body3">
          {year}년 {month}월 {day}일 {period} {hours}시, 지혜 사용자들이 많이 검색한 키워드예요!
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Accordion items={accordionData} type="single" className="flex flex-col gap-10 w-full " />
      </div>
    </div>
  )
}
