import { NextResponse } from 'next/server';
import { isEmail, sanitize } from '@/app/lib/validation';


// Env vars requeridas:
// NEXT_PUBLIC_CONTACT_ENABLED=true (cliente)
// RESEND_API_KEY=... (servidor)
// CONTACT_TO=benjamacias01@gmail.com (servidor)


function buildSubject(s) {
const cleaned = sanitize(s).slice(0, 120);
return cleaned.length ? cleaned : 'Consulta de contacto';
}


export async function POST(req) {
try {
const body = await req.json();
const from_name = sanitize(body.from_name);
const reply_to = sanitize(body.reply_to);
const subject = buildSubject(body.subject);
const message = sanitize(body.message).slice(0, 2000);


if (!from_name || !isEmail(reply_to) || !message) {
return NextResponse.json({ ok: false, error: 'INVALID_PAYLOAD' }, { status: 400 });
}


const enabled = process.env.NEXT_PUBLIC_CONTACT_ENABLED === 'true';
if (!enabled) {
return NextResponse.json({ ok: true, dryRun: true }, { status: 202 });
}


// Envío con Resend (ejemplo). Cambiá por tu proveedor si querés.
const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_TO || 'benjamacias01@gmail.com';
if (!apiKey) {
return NextResponse.json({ ok: false, error: 'MISSING_RESEND_API_KEY' }, { status: 500 });
}


const html = `
<h2>Nuevo mensaje de contacto</h2>
<p><strong>De:</strong> $${from_name} &lt;$${reply_to}&gt;</p>
<p><strong>Asunto:</strong> $${subject}</p>
<pre style="white-space:pre-wrap">$${message}</pre>
`;


const res = await fetch('https://api.resend.com/emails', {
method: 'POST',
headers: {
Authorization: `Bearer $${apiKey}`,
'Content-Type': 'application/json',
},
body: JSON.stringify({
from: 'Contacto <onboarding@resend.dev>',
to: [to],
subject: `[Contacto] $${subject}`,
html,
reply_to,
}),
});


if (!res.ok) {
const text = await res.text();
return NextResponse.json({ ok: false, error: 'RESEND_ERROR', detail: text }, { status: 502 });
}


return NextResponse.json({ ok: true }, { status: 200 });
} catch (err) {
return NextResponse.json(
{ ok: false, error: 'UNEXPECTED', detail: err?.message || 'unknown' },
{ status: 500 }
);
}
}