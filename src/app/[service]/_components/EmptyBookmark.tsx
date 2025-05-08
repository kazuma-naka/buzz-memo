'use client';

import Lottie from 'lottie-react';
import emptyAnimation from '@/assets/animations/bookmark_animation.json';

export default function EmptyBookmark() {
  return (
    <div className="flex flex-col items-center justify-center my-16">
      <Lottie animationData={emptyAnimation} loop className="w-48 h-48" />
      <p className="mt-4 text-gray-500">ブックマークはありません</p>
    </div>
  );
}
