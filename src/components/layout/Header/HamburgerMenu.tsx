import Link from 'next/link'
import ArrowIcon from '/public/icons/chevron.svg?svgr'

type SubMenuItem = {
  title: string
  href: string
  subMenu?: { title: string; href: string }[]
}

type MenuItem = {
  title: string
  href: string
  subMenu?: SubMenuItem[]
}

const menuData: MenuItem[] = [
  {
    title: '크리에이티브',
    href: '/creative',
    subMenu: [
      {
        title: '드로잉',
        href: '#',
        subMenu: [
          { title: '펜・연필', href: '/creative/drawing/pen-pencil' },
          { title: '마카', href: '/creative/drawing/marker' },
          { title: '색연필', href: '/creative/drawing/colored-pencil' },
          { title: '수채화', href: '/creative/drawing/watercolor' },
          { title: '오일파스텔', href: '/creative/drawing/oil-pastel' },
          { title: '과슈・아크릴화', href: '/creative/drawing/gouache-acrylic' },
          { title: '유화', href: '/creative/drawing/oil-painting' },
          { title: '동양화', href: '/creative/drawing/oriental' },
          { title: '디지털 드로잉', href: '/creative/drawing/digital' },
          { title: '캘리그래피', href: '/creative/drawing/calligraphy' },
          { title: '더 새로운 드로잉', href: '/creative/drawing/new' },
        ],
      },
      { title: '공예', href: '/creative/craft' },
      { title: '요리・음료', href: '/creative/cooking' },
      { title: '베이킹・디저트', href: '/creative/baking' },
    ],
  },
  {
    title: '커리어',
    href: '/career',
    subMenu: [
      { title: '디자인', href: '/career/design' },
      { title: '개발', href: '/career/development' },
      { title: '직무교육', href: '/career/job-training' },
      { title: '글쓰기', href: '/career/writing' },
      { title: '언어', href: '/career/language' },
    ],
  },
  { title: '머니', href: '/money', subMenu: [{ title: '수익 창출', href: '/money/earning' }] },
  { title: '키즈', href: '/kids', subMenu: [{ title: '아동 교육', href: '/kids/education' }] },
  { title: '스토어', href: '/store', subMenu: [{ title: 'DIY 키트', href: '/store/diy-kit' }] },
]

const HamburgerMenu = () => {
  return (
    <ul className="absolute left-0 top-full bg-white w-50 pb-5 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08),_0px_16px_30px_4px_rgba(0,0,0,0.10)]">
      {menuData.map((menu, index) => (
        <li key={index}>
          <div className="typo-caption2 text-assistive pt-4 pb-2 pl-8 pr-6">{menu.title}</div>

          {menu.subMenu && (
            <ul>
              {menu.subMenu.map((sub, subIndex) => (
                <li key={subIndex} className="group px-3">
                  {/* 3뎁스가 있으면 클릭 방지 */}
                  {sub.subMenu ? (
                    <div className="flex items-center justify-between py-2.5 pl-5 pr-2 cursor-pointer hover:typo-button2">
                      <span>{sub.title}</span>
                      <ArrowIcon className="size-3 text-strong" />
                    </div>
                  ) : (
                    <Link href={sub.href} className="block px-5 py-2 hover:typo-button2">
                      {sub.title}
                    </Link>
                  )}

                  {/* 3뎁스가 있는 경우 hover 시 보이도록 설정 */}
                  {sub.subMenu && (
                    <ul className="absolute left-full top-0 h-full border-l border-assist-line bg-white w-50 px-3 py-5 hidden group-hover:block">
                      {sub.subMenu.map((subItem, i) => (
                        <li key={i} className="hover:bg-neutral">
                          <Link href={subItem.href} className="typo-caption1 block pl-5 pr-3 py-2">
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default HamburgerMenu
