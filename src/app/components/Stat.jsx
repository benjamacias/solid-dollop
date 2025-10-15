'use client';
import { motion } from 'framer-motion';
export default function Stat({ kpi, label }) {
return (
<motion.div
className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/50"
initial={{ opacity: 0, y: 8 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.4 }}
>
<div className="text-3xl font-extrabold text-cyan-400">{kpi}</div>
<div className="mt-1 text-neutral-300">{label}</div>
</motion.div>
);
}