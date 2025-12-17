'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { CONTACT_ENABLED, EMAILJS_CONFIG } from '@/app/config';
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
      subject: 'Consulta de contacto',
      message: sanitize(formData.get('message')).slice(0, 2000),
    };

    if (!isValidPayload(payload)) {
      setStatus('error');
      console.error('Payload inválido', payload);
      return;
    }

    // Validar configuración de EmailJS
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      console.error('Configuración de EmailJS incompleta');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: payload.from_name,
          reply_to: payload.reply_to,
          subject: payload.subject,
          message: payload.message,
        },
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200) {
        setStatus('ok');
        formRef.current?.reset();
      } else {
        throw new Error(`EmailJS error: ${result.text}`);
      }
    } catch (error) {
      console.error('Error al enviar email:', error);
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
          <span>Name</span>
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
        <span>Message</span>
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
        {status === 'sending' ? 'Enviando…' : 'Iniciar conversación'}
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
          El envío está deshabilitado. Configurá
          <code className="mx-1 rounded bg-neutral-800 px-1 py-0.5 text-[0.7rem]">
            NEXT_PUBLIC_CONTACT_ENABLED=true
          </code>
          y las variables de EmailJS en <code>.env.local</code>.
        </p>
      ) : null}
    </form>
  );
}
