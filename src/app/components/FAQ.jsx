'use client';
import { motion } from 'framer-motion';
export default function FAQ({ q, a }) {
return (
<motion.div
className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/50"
initial={{ opacity: 0, y: 8 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.35 }}
>
<h4 className="font-semibold">{q}</h4>
<p className="mt-2 text-neutral-300 text-sm">{a}</p>
</motion.div>
);
}