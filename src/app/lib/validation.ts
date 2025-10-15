export interface ContactPayload {
  from_name: string;
  reply_to: string;
  subject: string;
  message: string;
}

export function sanitize(value: FormDataEntryValue | null | undefined): string {
  if (typeof value !== 'string') return '';
  return value.trim();
}

export function isEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function isValidPayload(payload: ContactPayload): payload is ContactPayload {
  return (
    Boolean(payload.from_name) &&
    isEmail(payload.reply_to) &&
    Boolean(payload.message) &&
    payload.subject !== undefined
  );
}
