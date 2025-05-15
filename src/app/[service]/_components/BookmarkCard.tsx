'use client';

import React, { useState } from 'react';
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
import { toggleBookmarkVisibility } from '@/actions/bookmarks';
import { fetchTagList, addTag, removeTag } from '@/actions/tagList';
import { Badge } from '@/components/ui/badge';
import { VisibilityToggle } from './icons/VisibilityToggleIcon';
import { EditBookmarkButton } from './icons/EditBookmarkButton';
import TagIcon from './tag/TagIcon';
import MemoIcon from './memo/MemoIcon';
import TagDialog from './tag/TagDialog';
import { saveBookmarkMemo } from '@/actions/bookmarks';
import MemoDialog from './memo/MemoDialog';

interface Props {
  bookmark: Bookmark;
  editable?: boolean;
  servicePath?: string;
  initialTags: string[];
  initialTagListId: string;
}

export const BookmarkCard: React.FC<Props> = ({
  bookmark,
  editable = false,
  servicePath = '',
  initialTags,
  initialTagListId,
}) => {
  const [isVisible, setIsVisible] = useState(bookmark.is_visible);
  const toggleVisibility = async () => {
    const next = !isVisible;
    setIsVisible(next);
    try {
      await toggleBookmarkVisibility(bookmark.id, next);
    } catch {
      setIsVisible(isVisible);
    }
  };

  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagListId, setTagListId] = useState<string>(initialTagListId);
  const [newTag, setNewTag] = useState('');
  const [isTagOpen, setIsTagOpen] = useState(false);

  const handleTagIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTagOpen(true);
    fetchTagList(bookmark.id)
      .then(({ tagListId, tags }) => {
        setTagListId(tagListId);
        setTags(tags);
      })
      .catch((err) => console.error(err));
  };

  const handleAdd = async () => {
    if (!newTag.trim()) return;
    await addTag(tagListId, newTag.trim());
    setTags((tag) => [...tag, newTag.trim()]);
    setNewTag('');
  };

  const handleRemove = async (tag: string) => {
    await removeTag(tagListId, tag);
    setTags((t) => t.filter((x) => x !== tag));
  };

  const rawMemo = bookmark.memo ?? '';
  let parsedMemo: string;
  try {
    parsedMemo = JSON.parse(rawMemo);
  } catch {
    parsedMemo = rawMemo;
  }

  const [memo, setMemo] = useState<string>(parsedMemo);
  const [editedMemo, setEditedMemo] = useState<string>(memo);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);

  const handleMemoIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedMemo(memo);
    setIsMemoOpen(true);
  };

  const handleSaveMemo = async () => {
    if (editedMemo.trim() === memo.trim()) {
      setIsMemoOpen(false);
      return;
    }
    await saveBookmarkMemo(bookmark.id, JSON.stringify(editedMemo));
    setMemo(editedMemo);
    setIsMemoOpen(false);
  };

  const editHref = `/${servicePath}/edit/${bookmark.id}`;
  const dateOnly = bookmark.uploaded_date.slice(0, 10);

  return (
    <>
      <motion.div
        onClick={() => window.open(bookmark.url, '_blank')}
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
              '#0D47A1',
              '#1976D2',
              '#42A5F5',
              '#64B5F6',
              '#0D47A1',
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
            <div className="absolute top-2 right-2 z-20 flex items-center space-x-2 gap-4 mr-4">
              <EditBookmarkButton editHref={editHref} />
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

            <CardContent className="p-4 pt-2 ">
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

              {editable && (
                <div>
                  <VisibilityToggle
                    isVisible={isVisible}
                    onToggle={toggleVisibility}
                  />
                </div>
              )}
            </CardFooter>

            {tags.length > 0 && (
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    className="px-4 py-2 bg-[#ffffff] text-[#222222]"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </MotionCard>
      </motion.div>

      {isTagOpen && (
        <div
          onClick={() => setIsTagOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20"
        >
          <TagDialog
            tags={tags}
            newTag={newTag}
            editable={editable}
            onTagChange={setNewTag}
            onAddTag={handleAdd}
            onRemoveTag={handleRemove}
            onClose={() => setIsTagOpen(false)}
          />
        </div>
      )}

      {isMemoOpen && (
        <div
          onClick={() => setIsMemoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20"
        >
          <MemoDialog
            originalMemo={memo}
            editedMemo={editedMemo}
            editable={editable}
            onChange={setEditedMemo}
            onSave={handleSaveMemo}
            onClose={() => setIsMemoOpen(false)}
          />
        </div>
      )}
    </>
  );
};
