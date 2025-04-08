import Image from 'next/image'
import React from 'react'
import BannerImage from '/public/home-banner.jpg'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

const EventBanner = () => {
  return (
    <div className="flex justify-center items-center">
      <Link href={ROUTES.SALE}>
        <Image src={BannerImage} alt="오라에서만 가능한 오늘의특가 탑 100" />
      </Link>
    </div>
  )
}

export default EventBanner
