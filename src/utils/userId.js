export function getUserIdFromEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return `u_${hash.toString(16)}`;
}

