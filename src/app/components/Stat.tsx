'use client';

import { motion } from 'framer-motion';

interface StatProps {
  kpi: string;
  label: string;
}

export default function Stat({ kpi, label }: StatProps) {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-surface-raised/80 p-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-3xl font-extrabold text-cyan-400">{kpi}</div>
      <div className="mt-1 text-neutral-300">{label}</div>
    </motion.div>
  );
}
