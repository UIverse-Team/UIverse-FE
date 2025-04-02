import Link from 'next/link'
import type { Store } from '@/types/store/storeTypes'
import TextButton from '../common/Button/TextButton'
import StoreCard from './StoreCard'

const StoreSection = ({ stores }: { stores: Store[] }) => (
  <div className="w-full p-6 bg-white rounded-lg">
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="typo-h3">
          스토어
          <span className="typo-button1 text-assistive">
            ({stores.length.toLocaleString('ko-KR')})
          </span>
        </p>
        <TextButton size="sm" iconPosition="right">
          <Link href="/stores">전체보기</Link>
        </TextButton>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {stores.length > 0 ? (
          stores.slice(0, 3).map((store) => <StoreCard key={store.mall_seq} store={store} />)
        ) : (
          <p className="text-assistive typo-body2">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  </div>
)

export default StoreSection
