'use client';
import { motion } from 'framer-motion';
export default function TagGroup({ title, tags }) {
return (
<motion.div
className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/50"
initial={{ opacity: 0, y: 10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.4 }}
>
<div className="text-sm text-neutral-400">{title}</div>
<div className="mt-2 flex flex-wrap gap-2">
{tags.map((t) => (
<span
key={t}
className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300"
>
{t}
</span>
))}
</div>
</motion.div>
);
}