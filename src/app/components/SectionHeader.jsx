'use client';
export default function SectionHeader({ title, caption }) {
return (
<div className="flex flex-col items-start">
<h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
{caption && <p className="mt-2 text-neutral-300 max-w-2xl">{caption}</p>}
</div>
);
}