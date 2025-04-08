'use client'

import AdAlertSetting from '@/components/auth/edit-profile/AdAlertSetting'
import Addresses from '@/components/auth/edit-profile/Addresses'
import EditProfile from '@/components/auth/edit-profile/EditProfile'
import React from 'react'

export const EditProfilePage = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 회원정보수정 */}
      <EditProfile />
      {/* 주소록 */}
      <Addresses />
      {/* 마케팅 및 광고 알림 설정 */}
      <AdAlertSetting />
    </div>
  )
}

export default EditProfilePage
