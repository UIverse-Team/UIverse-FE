'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MENU_ITEMS } from '@/constants/menu'
import UtilButton from './UtilButton'
import MenuNavList from './MenuNavList'
import SearchBar from './SearchBar'
import Logo from '/public/icons/ora.svg'
import HamburgerIcon from '/public/icons/hamburger.svg?svgr'

const Header = () => {
  const isLogin = true
  const userName = '나소나'
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
            {isLogin ? (
              <UtilButton
                iconType="logout"
                label="로그아웃"
                isButton={true}
                onClick={() => console.log('로그아웃')}
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
                isLogin ? (
                  <span>
                    <span className="font-bold">{userName}</span>님
                  </span>
                ) : (
                  '마이페이지'
                )
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-8 py-4">
          {/* Hamburger */}
          <button>
            <HamburgerIcon className="size-6 text-strong" />
          </button>
          {/* MenuNav */}
          <MenuNavList items={MENU_ITEMS} />
        </div>
      </div>
    </header>
  )
}

export default Header
