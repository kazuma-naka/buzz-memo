'use client';

import router from 'next/router';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bookmark } from '@/types/bookmark';
import MotionCard from '@/components/MotionCard';
import { createClient } from '@/lib/supabase/client';
import { Edit } from 'lucide-react';
import { VisibilityToggle } from './VisibilityToggleIcon';

interface Props {
  bookmark: Bookmark;
  editable?: boolean;
  servicePath?: string;
}

export const BookmarkCard: React.FC<Props> = ({
  bookmark,
  editable = false,
  servicePath = '',
}) => {
  const supabase = createClient();
  const editHref = `/${servicePath}/edit/${bookmark.id}`;
  const dateOnly = bookmark.uploaded_date.slice(0, 10);
  const [isVisible, setIsVisible] = useState(bookmark.is_visible);
  const toggleVisibility = async () => {
    const next = !isVisible;
    setIsVisible(next);
    const { error } = await supabase
      .from('bookmarks')
      .update({ is_visible: next })
      .eq('id', bookmark.id);
    if (error) setIsVisible(!next);
  };
  return (
    <>
      <motion.div
        onClick={() => {
          window.open(bookmark.url, '_blank');
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative block break-inside-avoid mb-6 cursor-pointer"
      >
        <MotionCard
          initial={{ borderColor: 'transparent' }}
          whileHover={{
            borderColor: [
              '#FFB3BA',
              '#FFDFBA',
              '#FFFFBA',
              '#BAFFC9',
              '#BAE1FF',
              '#E0BBE4',
              '#A0C4FF',
              '#69A1FF',
              '#4D75FF',
              '#3A5EFF',
              '#ACE7FF',
              '#BAE1FF',
              '#FFB3BA',
            ],
            backgroundColor: '#F0EEE6',
            transition: {
              borderColor: { duration: 4, ease: 'linear', repeat: Infinity },
              backgroundColor: { duration: 0.3, ease: 'easeInOut' },
            },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="overflow-hidden rounded-lg p-2 border-2"
          style={{ borderStyle: 'solid', backgroundColor: '#FAF9F5' }}
        >
          {editable && (
            <div className="absolute top-2 right-2 z-20 flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(editHref);
                }}
                className="group p-2 bg-white rounded-full hover:bg-gray-200 flex items-center"
                aria-label="Edit bookmark"
              >
                <Edit className="transition-transform group-hover:-translate-x-1 w-6 h-6 text-gray-600" />
                <span className="ml-1 text-sm text-gray-800 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  編集する
                </span>
              </button>
              <VisibilityToggle
                isVisible={isVisible}
                onToggle={toggleVisibility}
              />
            </div>
          )}

          <div className="relative z-10">
            <CardHeader
              className={
                'flex items-center justify-between p-4 ' +
                (editable ? 'mt-6' : '')
              }
            >
              <div className="flex items-center space-x-2">
                {bookmark.favicon_url && (
                  <img
                    src={bookmark.favicon_url}
                    alt="favicon"
                    className="w-8 h-8 object-contain rounded-lg"
                  />
                )}
                <CardTitle className="text-base font-medium">
                  <motion.a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05, color: '#2E4A5A' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-block hover:underline"
                  >
                    {bookmark.title}
                  </motion.a>
                </CardTitle>
              </div>
            </CardHeader>

            {bookmark.twitter_image_url && (
              <img
                src={bookmark.twitter_image_url}
                alt="preview"
                className="w-full h-auto object-cover"
              />
            )}

            <CardContent className="p-4 pt-2">
              <CardDescription className="text-sm line-clamp-3">
                {bookmark.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="flex items-center justify-between px-4 pb-2 pt-2">
              <time
                dateTime={bookmark.uploaded_date}
                className="text-xs text-gray-500"
              >
                {dateOnly}
              </time>
            </CardFooter>
          </div>
        </MotionCard>
      </motion.div>
    </>
  );
};
