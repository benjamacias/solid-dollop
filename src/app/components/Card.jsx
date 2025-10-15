'use client';
import { motion } from 'framer-motion';
export default function Card({ title, desc, bullets = [] }) {
return (
<motion.div
className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/50 hover:bg-neutral-900 transition"
whileHover={{ y: -4, scale: 1.01 }}
transition={{ type: 'spring', stiffness: 250, damping: 20 }}
>
<h3 className="text-lg font-semibold">{title}</h3>
<p className="mt-2 text-neutral-300">{desc}</p>
<ul className="mt-3 space-y-1 text-sm text-neutral-400 list-disc list-inside">
{bullets.map((b) => (
<li key={b}>{b}</li>
))}
</ul>
</motion.div>
);
}