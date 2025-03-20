import Image from 'next/image'
import Link from 'next/link'
import { SITEMAP_DATA } from '@/constants/sitemap'
import Sitemap from './Sitemap'
import Divider from '../../common/Divider/Divider'
import Button from '../../common/Button/Button'
import Logo from '/public/icons/ora.svg'

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container-1200 flex flex-col gap-8 py-8">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div className="width-[280px] flex flex-col items-start gap-2">
            <h1 className="w-[100px] py-3.5 leading-0">
              <Link href="/" className="inline-flex">
                <Image src={Logo} alt="Ora" width={74} height={31} />
              </Link>
            </h1>
            <p className="typo-caption1 text-normal">
              Ora는 모든 사람들의 편리한 쇼핑을 위해
              <br /> 열심히 노력합니다.
            </p>
          </div>
          {/* Sitemap, Contact */}
          <div className="pr-20">
            <ul className="flex justify-between items-start gap-8">
              {SITEMAP_DATA.map((category) => (
                <Sitemap key={category.id} category={category} />
              ))}
              <li className="flex flex-col gap-4 w-[210px]">
                <h3 className="typo-h3 text-normal py-1">Contact</h3>
                <Button variant="tertiary" size="md">
                  문의하기
                </Button>
                <p className="text-alternative">
                  오전 10시 ~ 오후 6시
                  <br />
                  주말, 공휴일 제외
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Divider />

        {/* Company Info */}
        <div className="flex max-w-[860px] flex-col items-start gap-4 typo-caption2 text-assistive">
          <ul className="flex items-center gap-2">
            <li>
              <Link href="#">이용약관</Link>
            </li>
            <li>･</li>
            <li>
              <Link href="#">개인정보 처리방침</Link>
            </li>
            <li>･</li>
            <li>
              <Link href="#">환불 정책</Link>
            </li>
            <li>･</li>
            <li>
              <Link href="#">사업자 정보 확인</Link>
            </li>
            <li>･</li>
            <li>
              <Link href="#">제휴/협력 문의</Link>
            </li>
          </ul>
          <p className="break-keep">
            (주) Ora | 대표 이규화 | 서울특별시 어쩌고 저쩌고 | 사업자등록번호 : 000-00-00000 |
            통신판매업신고 : 2019-서울중구-0087 | 주식회사 Ora는 전자상거래 등에서의
            소비자보호에관한 법률에 따른 통신판매업과 통신판매중개업을 영위하고 있습니다. 주식회사
            지혜는 통신판매중개자로서 중개하는 통신판매에 관하여서는 통신판매의 당사자가 아니므로
            어떠한 책임도 부담하지 아니합니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
