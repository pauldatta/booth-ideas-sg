import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState() {
  return (
    <div className="space-y-12">
      {/* PRD Skeletons */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-2/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Criteria Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Card>
            <CardContent className="p-4 space-y-2">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </CardContent>
        </Card>
      </div>

      {/* Sandbox Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Card>
            <CardContent className="p-4">
                <Skeleton className="h-80 w-full" />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
