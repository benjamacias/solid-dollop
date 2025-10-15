'use client';

import { motion } from 'framer-motion';

interface FAQProps {
  q: string;
  a: string;
}

export default function FAQ({ q, a }: FAQProps) {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-surface-raised/80 p-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <h4 className="text-base font-semibold text-white">{q}</h4>
      <p className="mt-2 text-sm text-neutral-300">{a}</p>
    </motion.div>
  );
}
