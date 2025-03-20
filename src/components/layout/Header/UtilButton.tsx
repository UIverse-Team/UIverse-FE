import { ReactNode } from 'react'
import Link from 'next/link'
import LoginIcon from '/public/login.svg?svgr'
import LogoutIcon from '/public/logout.svg?svgr'
import CartIcon from '/public/cart.svg?svgr'
import UserIcon from '/public/user.svg?svgr'

interface HeaderUtilButtonProps {
  href?: string
  iconType: 'login' | 'logout' | 'cart' | 'user'
  label: ReactNode
  onClick?: () => void
  isButton?: boolean
}

const HeaderUtilButton = ({
  href = '#',
  iconType,
  label,
  onClick,
  isButton = false,
}: HeaderUtilButtonProps) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'login':
        return <LoginIcon />
      case 'logout':
        return <LogoutIcon />
      case 'cart':
        return <CartIcon />
      case 'user':
        return <UserIcon />
      default:
        return null
    }
  }

  const content = (
    <div className="w-13 h-13 flex flex-col items-center justify-between typo-caption2 text-normal text-center">
      {renderIcon()}
      {label}
    </div>
  )

  if (isButton) {
    return <button onClick={onClick}>{content}</button>
  }

  return <Link href={href}>{content}</Link>
}

export default HeaderUtilButton
