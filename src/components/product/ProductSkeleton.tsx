import { Skeleton } from '@/components/ui/skeleton'

export const ProductSkeleton = () => {
  return (
    <div className="flex gap-4 flex-wrap justify-around">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-[248px]">
          <Skeleton className="w-[248px] h-[248px] rounded-md" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-[44px] w-full" />
          <div className="flex gap-1 items-center">
            <Skeleton className="h-6 w-[40px]" />
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-4 w-[80px] line-through" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="w-[1.5px] h-[1.5px] rounded-full" />
            <Skeleton className="h-4 w-[40px]" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-6 w-[70px] rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}
