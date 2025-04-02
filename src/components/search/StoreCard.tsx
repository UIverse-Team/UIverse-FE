import Image from 'next/image'
import WishIcon from '/public/icons/wishlist-off.svg?svgr'
import { Store } from '@/types/store/storeTypes'

const StoreCard = ({ store }: { store: Store }) => {
  return (
    <div className="flex flex-1 items-center justify-between gap-2 py-4 pr-4 pl-3 border border-assist-line rounded-[12px]">
      <div className="flex items-center gap-2">
        <Image
          src="https://i.pinimg.com/236x/2d/d0/0e/2dd00e2ae7ad63231363084704ece5e1.jpg"
          alt={store.name}
          className="rounded-full size-12"
          width="48"
          height="48"
        />
        <div className="flex flex-col">
          <p className="typo-button1 overflow-hidden text-ellipsis">{store.name}</p>
          <span className="typo-caption2">20대 러블리 데일리룩</span>
        </div>
      </div>
      <div className="flex items-center text-primary">
        <WishIcon className="size-4" />
        <span className="typo-caption2">{store.store_wish_count.toLocaleString('ko-KR')}</span>
      </div>
    </div>
  )
}

export default StoreCard
