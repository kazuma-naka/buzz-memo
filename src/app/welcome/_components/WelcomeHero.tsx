'use client';

import { motion } from 'framer-motion';

export default function WelcomeHero() {
  return (
    <motion.h2
      className="text-lg md:text-xl max-w-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      自分のサービスに言及された記事をワンクリックで収集し、公開／非公開や
      タグ付け・メモまで一元管理できるブックマークプラットフォーム。
    </motion.h2>
  );
}
