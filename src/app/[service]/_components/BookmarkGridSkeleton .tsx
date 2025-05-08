import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function BookmarkGridSkeleton() {
  const CARD_COUNT = 6;

  return (
    <div className="relative">
      <div className="mx-auto mt-10 max-w-screen-xl space-y-12 px-4">
        <section>
          <div className="flex justify-center">
            <Skeleton className="h-8 w-32 rounded-full mb-2" />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: CARD_COUNT }).map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-40 w-full rounded" />
                <div className="flex space-x-2">
                  <Skeleton className="h-4 w-10 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
