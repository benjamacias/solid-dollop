'use client';

import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  desc: string;
  bullets?: string[];
}

export default function Card({ title, desc, bullets = [] }: CardProps) {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-surface-raised/80 p-6 transition hover:bg-surface-raised"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-neutral-300">{desc}</p>
      {!!bullets.length && (
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-400">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
