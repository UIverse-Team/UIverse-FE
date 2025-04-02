'use client'

import EditProfile from '@/components/auth/edit-profile/EditProfile'
import React from 'react'

export const EditProfilePage = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 회원정보수정 */}
      <EditProfile />
    </div>
  )
}

export default EditProfilePage
