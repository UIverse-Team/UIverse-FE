'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { MemberLogin } from '@/components/auth/login/MemberLogin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tab/Tab'
import { SocialLogin } from '@/components/auth/login/SocialLogin'
import { GuestOrderCheck } from '@/components/auth/login/GuestOrderCheck'
import { ROUTES } from '@/constants/routes'
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner'
import { LoginPageParams } from '@/components/login/LoginParams'

export default function LoginPage() {
  const router = useRouter()

  const handlePopularPage = () => {
    router.push(ROUTES.PURCHASE)
  }

  return (
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

        <Suspense fallback={<LoadingSpinner />}>
          <LoginPageParams handlePopularPage={handlePopularPage} />
        </Suspense>
      </div>
    </div>
  )
}
