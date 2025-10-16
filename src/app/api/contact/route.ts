import { NextResponse } from 'next/server';

import { CONTACT_ENABLED } from '@/app/config';
import { isEmail, sanitize } from '@/app/lib/validation';

const CONTACT_TO = process.env.CONTACT_TO ?? 'benjamacias01@gmail.com';
const RESEND_API_URL = 'https://api.resend.com/emails';

function buildSubject(subject: unknown): string {
  const cleaned = sanitize(typeof subject === 'string' ? subject : null).slice(0, 120);
  return cleaned.length > 0 ? cleaned : 'Consulta de contacto';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const from_name = sanitize(body.from_name).slice(0, 120);
    const reply_to = sanitize(body.reply_to);
    const subject = buildSubject(body.subject);
    const message = sanitize(body.message).slice(0, 2000);

    if (!from_name || !isEmail(reply_to) || !message) {
      return NextResponse.json(
        { ok: false, error: 'INVALID_PAYLOAD' },
        { status: 400 },
      );
    }

    if (!CONTACT_ENABLED) {
      return NextResponse.json({ ok: true, dryRun: true }, { status: 202 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: 'MISSING_RESEND_API_KEY' },
        { status: 500 },
      );
    }

    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>De:</strong> ${from_name} &lt;${reply_to}&gt;</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <pre style="white-space:pre-wrap">${message}</pre>
    `;

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contacto <onboarding@resend.dev>',
        to: [CONTACT_TO],
        subject: `[Contacto] ${subject}`,
        html,
        reply_to,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        { ok: false, error: 'RESEND_ERROR', detail },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'unknown';
    return NextResponse.json(
      { ok: false, error: 'UNEXPECTED', detail },
      { status: 500 },
    );
  }
}
