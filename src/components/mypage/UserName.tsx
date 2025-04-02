'use client'

import { useAuthStore } from '@/stores/user'

const UserName = () => {
  const { userName } = useAuthStore()
  return <span>{userName}</span>
}

export default UserName
