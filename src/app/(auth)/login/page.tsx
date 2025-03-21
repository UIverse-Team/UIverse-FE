'use client'

import Button from '@/components/common/Button/Button'
import TextButton from '@/components/common/Button/TextButton'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import { Input } from '@/components/common/Input/Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tab/Tab'
import { SocialLogin } from '@/components/login/SocialLogin'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

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
              <div className="pt-4 pb-2">
                <div className="h-[75px]">
                  <Input variant="auth" placeholder="이메일" />
                </div>
                <Input variant="auth" type="password" placeholder="비밀번호" />
                <div className="mt-10 p-2 pr-0 flex justify-between">
                  <Checkbox id="saveId" size="lg" label="아이디저장" />
                  <div className="flex">
                    <TextButton
                      size="sm"
                      className="pr-2 border-r border-assist-line mr-2 text-alternative"
                    >
                      비밀번호 찾기
                    </TextButton>
                    <TextButton size="sm" className="text-alternative">
                      아이디 찾기
                    </TextButton>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button className="mb-2">로그인</Button>
                <Button onClick={() => router.push('/signup')} variant="outline">
                  회원가입
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="guest">Change your password here.</TabsContent>
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
