const THEME_KEY = 'motore_theme_v1';

export function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return null;
}

export function setPreferredTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme(current) {
  return current === 'light' ? 'dark' : 'light';
}

