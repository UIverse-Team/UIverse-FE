'use client'

import { MemberLogin } from '@/components/auth/login/MemberLogin'
import TextButton from '@/components/common/Button/TextButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tab/Tab'
import { SocialLogin } from '@/components/auth/login/SocialLogin'
import { useState } from 'react'
import { GuestOrderCheck } from '@/components/auth/login/GuestOrderCheck'

export default function LoginPage() {
  const [isGuestOrder] = useState(false)

  return (
    <div>
      <div id="section" className="flex justify-center items-center">
        <div className="w-[438px] flex flex-col justify-center">
          <div className="typo-h1 flex justify-center py-4">로그인</div>
          <Tabs defaultValue="member" className="mt-8">
            <TabsList>
              <TabsTrigger value="member">회원</TabsTrigger>
              <TabsTrigger value="guest">비회원 주문 조회</TabsTrigger>
            </TabsList>
            <TabsContent value="member">
              <MemberLogin />
            </TabsContent>
            <TabsContent value="guest">
              <GuestOrderCheck />
            </TabsContent>
          </Tabs>
          <div className="my-10">
            <SocialLogin />
          </div>
          {isGuestOrder && (
            <TextButton iconPosition="right" className="py-3 typo-button1 text-assistive flex">
              비회원 주문하기
            </TextButton>
          )}
        </div>
      </div>
    </div>
  )
}
