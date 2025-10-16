'use client';

import { motion } from 'framer-motion';

interface TagGroupProps {
  title: string;
  tags: string[];
}

export default function TagGroup({ title, tags }: TagGroupProps) {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-surface-raised/80 p-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-700/70 px-3 py-1 text-xs text-neutral-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
