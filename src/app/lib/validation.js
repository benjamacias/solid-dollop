export function isEmail(v) {
return /\S+@\S+\.\S+/.test(v || '');
}
export function sanitize(v) {
return typeof v === 'string' ? v.trim() : '';
}
export function isValidPayload(p) {
if (!p) return false;
const from_name = sanitize(p.from_name);
const reply_to = sanitize(p.reply_to);
const subject = sanitize(p.subject).slice(0, 120);
const message = sanitize(p.message).slice(0, 2000);
return !!(from_name && isEmail(reply_to) && message && subject !== undefined);
}