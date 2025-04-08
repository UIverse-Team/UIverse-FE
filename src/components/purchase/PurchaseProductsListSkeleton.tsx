import { Skeleton } from '@/components/ui/skeleton'

export const PurchaseProductsListSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl">
      <div className="p-6 border-b-[1px] border-alter-line">
        <Skeleton className="h-6 w-[180px]" />
      </div>

      <div className="flex flex-col px-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`py-4 ${index !== 2 ? 'border-b-[1px] border-alter-line' : ''}`}
          >
            <div className="flex gap-4">
              <Skeleton className="w-[80px] h-[80px] rounded-md shrink-0" />

              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
                <div className="flex justify-between w-full">
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-5 w-[60px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
