'use client';

import { motion } from 'framer-motion';

interface CaseProps {
  title: string;
  tech: string;
  desc: string;
}

export default function Case({ title, tech, desc }: CaseProps) {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-surface-raised/80 p-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
    >
      <div className="text-sm text-neutral-400">{tech}</div>
      <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-neutral-300">{desc}</p>
    </motion.div>
  );
}
