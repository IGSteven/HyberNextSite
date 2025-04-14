import { Skeleton } from "@/components/ui/skeleton"

export default function PricingTableSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">VPS Hosting Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-blue-600 p-6">
                <Skeleton className="h-6 w-32 bg-blue-500" />
                <Skeleton className="h-4 w-48 mt-2 bg-blue-500" />
              </div>
              <div className="p-6 flex-1">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-40 mb-6" />

                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>

                <Skeleton className="h-10 w-full mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Dedicated Server Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
                <Skeleton className="h-6 w-32 bg-blue-500" />
                <Skeleton className="h-4 w-48 mt-2 bg-blue-500" />
              </div>
              <div className="p-6 flex-1">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-40 mb-6" />

                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>

                <Skeleton className="h-10 w-full mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
