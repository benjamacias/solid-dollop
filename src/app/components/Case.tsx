// src/app/components/Case.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CaseProps {
  title: string;
  tech: string;
  desc: string;
  image?: string;
}

export default function Case({ title, tech, desc, image }: CaseProps) {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-surface-raised/80 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
    >
      {image && (
        <div className="relative w-full h-48 bg-neutral-900 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-sm text-neutral-400">{tech}</div>
        <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-neutral-300">{desc}</p>
      </div>
    </motion.div>
  );
}