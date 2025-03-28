'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MENU_ITEMS } from '@/constants/menuItems'
import UtilButton from './UtilButton'
import MenuNavList from './MenuNavList'
import SearchBar from './SearchBar/SearchBar'
import Logo from '/public/icons/ora.svg'
import HamburgerIcon from '/public/icons/hamburger.svg?svgr'
import { logout } from '@/serverActions/auth/logout/actions'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/user'
import HamburgerMenu from './HamburgerMenu'

const Header = () => {
  const router = useRouter()
  const { isLoggedIn, userName, logout: logoutAction } = useAuthStore()
  const user = userName || ''

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const hamburgerContainerRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    const result = await logout()

    if (result.user === null) {
      logoutAction()
      router.push(result.redirectTo)
    }
  }

  return (
    <header className="bg-white">
      <div className="container pt-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <h1 className="w-[100px] py-3.5 leading-0">
            <Link href="/" className="inline-flex">
              <Image src={Logo} alt="Ora" width={74} height={31} />
            </Link>
          </h1>
          {/* SearchBar */}
          <div className="flex px-8 flex-col align-start gap-8 flex-grow">
            <SearchBar />
          </div>
          {/* UtilBtn */}
          <div className="flex items-center justify-center gap-2">
            {/* 로그인/로그아웃 */}
            {isLoggedIn ? (
              <UtilButton
                iconType="logout"
                label="로그아웃"
                isButton={true}
                onClick={handleLogout}
              />
            ) : (
              <UtilButton href="/login" iconType="login" label="로그인" />
            )}
            {/* 장바구니 */}
            <UtilButton href="/cart" iconType="cart" label="장바구니" />
            {/* 마이페이지 */}
            <UtilButton
              href="/mypage"
              iconType="user"
              label={
                isLoggedIn ? (
                  <span>
                    <span className="font-bold">{user}</span>님
                  </span>
                ) : (
                  '마이페이지'
                )
              }
            />
          </div>
        </div>

        <div className="relative flex items-center gap-8 pt-4">
          <div
            ref={hamburgerContainerRef}
            onMouseEnter={() => setIsHamburgerOpen(true)}
            onMouseLeave={() => setIsHamburgerOpen(false)}
            className="pb-4"
          >
            <button className="flex items-center">
              <HamburgerIcon
                className={`size-6 ${isHamburgerOpen ? 'text-primary' : 'text-strong'}`}
              />
            </button>

            {isHamburgerOpen && <HamburgerMenu />}
          </div>
          {/* MenuNav */}
          <MenuNavList items={MENU_ITEMS} />
        </div>
      </div>
    </header>
  )
}

export default Header
