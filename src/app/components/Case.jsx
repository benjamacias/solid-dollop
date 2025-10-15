'use client';
import { motion } from 'framer-motion';
export default function Case({ title, tech, desc }) {
return (
<motion.div
className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/50"
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.45 }}
>
<div className="text-sm text-neutral-400">{tech}</div>
<h3 className="mt-1 text-lg font-semibold">{title}</h3>
<p className="mt-2 text-neutral-300">{desc}</p>
</motion.div>
);
}