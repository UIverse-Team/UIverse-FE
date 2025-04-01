import { Skeleton } from '@/components/ui/skeleton'

export const CartProductListSkeleton = () => {
  return (
    <div className="flex rounded-2xl p-6 bg-white gap-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-[180px]">
          <Skeleton className="w-[180px] h-[180px] rounded-md" />
          <div>
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-10 w-full mb-1" />
            <div className="flex gap-1">
              <Skeleton className="h-6 w-[40px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
