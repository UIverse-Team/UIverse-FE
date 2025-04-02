'use client'

import { useAuthStore } from '@/stores/user'

const UserName = () => {
  const { userName } = useAuthStore()
  return (
    <div className="typo-h3">
      안녕하세요, <span>{userName}</span>님
    </div>
  )
}

export default UserName
