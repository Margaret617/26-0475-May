const USERS_KEY = 'notes_app_users_v1';

const SESSION_KEY = 'notes_app_session_v1';
const NOTES_UNLOCK_KEY = 'notes_app_notes_unlocked_v1';

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return safeParse(raw, {});
}

export function saveUsers(usersObj) {
  localStorage.setItem(USERS_KEY, JSON.stringify(usersObj));
}

export function makeUserId(email) {
  // Stable id per email; normalize
  const normalized = String(email).trim().toLowerCase();
  // Simple deterministic id without introducing more deps.
  // NOTE: This is not cryptographic; it's only an indexing key.
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return `u_${hash.toString(16)}`;
}

export function getSessionUserId() {
  return sessionStorage.getItem(SESSION_KEY);
}

export function setSessionUserId(userId) {
  sessionStorage.setItem(SESSION_KEY, userId);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(NOTES_UNLOCK_KEY);
}

export function isNotesUnlocked() {
  return sessionStorage.getItem(NOTES_UNLOCK_KEY) === 'true';
}

export function setNotesUnlocked(unlocked) {
  sessionStorage.setItem(NOTES_UNLOCK_KEY, unlocked ? 'true' : 'false');
}

function notesKeyForUser(userId) {
  return `notes_app_notes_blob_${userId}_v1`;
}

export function getEncryptedNotesBlob(userId) {
  const raw = localStorage.getItem(notesKeyForUser(userId));
  return safeParse(raw, null);
}

export function setEncryptedNotesBlob(userId, blob) {
  localStorage.setItem(notesKeyForUser(userId), JSON.stringify(blob));
}

export function removeEncryptedNotesBlob(userId) {
  localStorage.removeItem(notesKeyForUser(userId));
}

export function getUserRecord(userId) {
  const users = getUsers();
  return users[userId] || null;
}

export function upsertUserRecord(userId, record) {
  const users = getUsers();
  users[userId] = record;
  saveUsers(users);
}

export function deleteUserRecord(userId) {
  const users = getUsers();
  delete users[userId];
  saveUsers(users);
}

