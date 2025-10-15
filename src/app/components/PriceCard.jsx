'use client';
import { motion } from 'framer-motion';
export default function PriceCard({ title, note, points, featured }) {
return (
<motion.div
className={
'rounded-2xl border p-6 bg-neutral-900/50 ' +
(featured
? 'border-cyan-500 shadow-[0_0_0_1px_rgba(34,211,238,0.4)]'
: 'border-neutral-800')
}
whileHover={{ y: -4, scale: 1.01 }}
transition={{ type: 'spring', stiffness: 240, damping: 18 }}
>
<div className="text-sm text-neutral-400">{note}</div>
<h3 className="mt-1 text-lg font-semibold">{title}</h3>
<ul className="mt-3 space-y-1 text-sm text-neutral-300 list-disc list-inside">
{points.map((p) => (
<li key={p}>{p}</li>
))}
</ul>
</motion.div>
);
}