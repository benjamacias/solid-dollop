'use client';

import { motion } from 'framer-motion';

interface PriceCardProps {
  title: string;
  note: string;
  points: string[];
  featured?: boolean;
}

export default function PriceCard({
  title,
  note,
  points,
  featured = false,
}: PriceCardProps) {
  return (
    <motion.div
      className={`rounded-2xl border p-6 transition ${
        featured
          ? 'border-cyan-400/60 bg-surface-raised shadow-[0_0_0_1px_rgba(34,211,238,0.4)]'
          : 'border-neutral-800 bg-surface-raised/80'
      }`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
    >
      <div className="text-sm text-neutral-400">{note}</div>
      <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-300">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </motion.div>
  );
}
