'use client';

import { useRef, useState } from 'react';

import { CONTACT_ENABLED } from '@/app/config';
import {
  isValidPayload,
  sanitize,
  type ContactPayload,
} from '@/app/lib/validation';

type Status = 'idle' | 'sending' | 'ok' | 'error';

interface ContactFormProps {
  disabled?: boolean;
}

export default function ContactForm({ disabled = false }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || !CONTACT_ENABLED) return;

    const formData = new FormData(formRef.current ?? undefined);
    const payload: ContactPayload = {
      from_name: sanitize(formData.get('from_name')),
      reply_to: sanitize(formData.get('reply_to')),
      subject: sanitize(formData.get('subject')).slice(0, 120),
      message: sanitize(formData.get('message')).slice(0, 2000),
    };

    if (!isValidPayload(payload)) {
      setStatus('error');
      console.error('Payload inválido', payload);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('ok');
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-3 text-sm text-neutral-300"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>Nombre</span>
          <input
            name="from_name"
            required
            className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500/60"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            name="reply_to"
            required
            className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500/60"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span>Asunto</span>
        <input
          name="subject"
          maxLength={120}
          className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500/60"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Mensaje</span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={2000}
          className="resize-none rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500/60"
        />
      </label>
      <button
        type="submit"
        disabled={disabled || !CONTACT_ENABLED || status === 'sending'}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-300"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
      {status === 'ok' ? (
        <p className="text-sm text-emerald-300">Mensaje enviado. ¡Gracias!</p>
      ) : null}
      {status === 'error' ? (
        <p className="text-sm text-amber-300">
          No pudimos enviar el mensaje. Probá nuevamente en unos minutos.
        </p>
      ) : null}
      {!CONTACT_ENABLED ? (
        <p className="text-xs text-amber-400">
          El envío está deshabilitado en este entorno. Configurá
          <code className="mx-1 rounded bg-neutral-800 px-1 py-0.5 text-[0.7rem]">
            NEXT_PUBLIC_CONTACT_ENABLED=true
          </code>
          y las claves de Resend en <code>.env.local</code>.
        </p>
      ) : null}
    </form>
  );
}
