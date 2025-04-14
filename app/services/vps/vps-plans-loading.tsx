import { Skeleton } from "@/components/ui/skeleton"

export default function VpsPlansLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col border rounded-lg overflow-hidden">
          <div className="p-6">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48 mb-4" />
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="p-6 flex-1">
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
  )
}
