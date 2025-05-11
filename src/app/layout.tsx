import React from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import ViewportAdjuster from '@/components/common/ViewportAdjuster'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import Providers from '@/providers/Providers'
import { Toaster } from 'sonner'
import PageLogger from '@/components/log/PageLogger'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Ora',
  description: '당신만을 위한 쇼핑몰, Ora입니다.',
  icons: '/icons/ora.svg',
}

export const pretendard = localFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased text-strong`}>
        {/* 토스트 */}
        <Toaster />
        {/* 모바일 뷰포트 조정 */}
        <ViewportAdjuster />
        {/* 페이지 체류 로그 */}
        <PageLogger />

        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
