import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col">
      <div className="animate-pulse p-4 bg-white shadow">
        <Skeleton className="h-12 w-1/3" />
      </div>

      <div className="flex-1 flex items-start justify-center pt-12 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6 animate-pulse">
          <Skeleton className="h-12 w-full" />

          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      <div className="animate-pulse p-4 bg-white shadow">
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
