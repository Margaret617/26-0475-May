export function formatDate(dateLike) {
  const d = dateLike ? new Date(dateLike) : null;
  if (!d || Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString();
}

