'use client';
import { useRef, useState } from 'react';
import { sanitize, isValidPayload } from '@/app/lib/validation';


const CONTACT_ENABLED =
typeof process !== 'undefined' && process.env
? process.env.NEXT_PUBLIC_CONTACT_ENABLED === 'true'
: false;


export default function ContactForm({ disabled }) {
const formRef = useRef(null);
const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'ok' | 'error'


async function onSubmit(e) {
e.preventDefault();
if (disabled || !CONTACT_ENABLED) return;


const data = Object.fromEntries(new FormData(formRef.current));
const payload = {
from_name: sanitize(data.from_name),
reply_to: sanitize(data.reply_to),
subject: sanitize(data.subject),
message: sanitize(data.message),
};


if (!isValidPayload(payload)) {
setStatus('error');
console.error('Payload inválido');
return;
}


setStatus('sending');
try {
const res = await fetch('/api/contact', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!res.ok) throw new Error('HTTP ' + res.status);
setStatus('ok');
formRef.current?.reset();
} catch (err) {
console.error(err);
setStatus('error');
}
}


return (
<form ref={formRef} onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
<div className="grid sm:grid-cols-2 gap-3">
<label className="text-sm text-neutral-300">
Nombre
<input
name="from_name"
required
className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
/>
</label>
<label className="text-sm text-neutral-300">
Email
<input
type="email"
name="reply_to"
required
className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
/>
</label>
</div>
<label className="text-sm text-neutral-300">
Asunto
<input
name="subject"
className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
/>
</label>
<label className="text-sm text-neutral-300">
Mensaje
<textarea
name="message"
rows={5}
required
className="mt-1 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
