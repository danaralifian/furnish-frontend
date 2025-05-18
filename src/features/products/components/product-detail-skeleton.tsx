import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 my-8">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-20 rounded-md" />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4" />
          <div className="mt-2 flex items-center">
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        <Skeleton className="h-10 w-32" />

        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-20 mb-2" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-5 w-20 mb-2" />
            <div className="flex items-center">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>

        <Skeleton className="h-5 w-full" />

        <div>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}
