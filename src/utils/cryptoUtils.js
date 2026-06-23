import CryptoJS from 'crypto-js';

const encoder = CryptoJS.enc.Utf8;

function ensureString(value) {
  if (value === undefined || value === null) return '';
  return String(value);
}

function bytesToBase64(wordArray) {
  return CryptoJS.enc.Base64.stringify(wordArray);
}

function base64ToWordArray(base64) {
  return CryptoJS.enc.Base64.parse(base64);
}

function randomBase64(bytes = 16) {
  return bytesToBase64(CryptoJS.lib.WordArray.random(bytes));
}

function normalizeKeySalt(saltB64) {
  // PBKDF2 accepts string or WordArray. We store salt as base64 string.
  return base64ToWordArray(saltB64);
}

export function hashPasswordPBKDF2(password, saltB64, iterations = 150000, keySizeWords = 8) {
  const pwd = encoder.parse(ensureString(password));
  const salt = normalizeKeySalt(saltB64);
  const hash = CryptoJS.PBKDF2(pwd, salt, {
    keySize: keySizeWords,
    iterations,
    hasher: CryptoJS.algo.SHA256,
  });
  return bytesToBase64(hash);
}

export function createPasswordSalt() {
  // 16 bytes salt
  return randomBase64(16);
}

export function encryptAES(plainText, password, { iterations = 150000 } = {}) {
  const ivB64 = randomBase64(16);
  const saltB64 = createPasswordSalt();

  const key = CryptoJS.PBKDF2(ensureString(password), normalizeKeySalt(saltB64), {
    keySize: 8,
    iterations,
    hasher: CryptoJS.algo.SHA256,
  });

  const iv = base64ToWordArray(ivB64);

  const ciphertext = CryptoJS.AES.encrypt(ensureString(plainText), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    v: 1,
    alg: 'AES-CBC-PBKDF2',
    saltB64,
    ivB64,
    iterations,
    ciphertextB64: bytesToBase64(ciphertext.ciphertext),
  };
}

export function decryptAES(encryptedObj, password) {
  if (!encryptedObj || typeof encryptedObj !== 'object') {
    throw new Error('Invalid encrypted payload');
  }
  const { saltB64, ivB64, iterations, ciphertextB64 } = encryptedObj;
  const key = CryptoJS.PBKDF2(ensureString(password), normalizeKeySalt(saltB64), {
    keySize: 8,
    iterations: iterations ?? 150000,
    hasher: CryptoJS.algo.SHA256,
  });

  const iv = base64ToWordArray(ivB64);
  const ciphertext = base64ToWordArray(ciphertextB64);

  const decrypted = CryptoJS.AES.decrypt({
    ciphertext,
  }, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const text = decrypted.toString(encoder);
  if (!text) {
    // When password is wrong, it often results in empty string.
    throw new Error('Decryption failed (wrong password?)');
  }
  return text;
}

export function hashSecurityAnswer(answer, saltB64, iterations = 150000) {
  return hashPasswordPBKDF2(answer, saltB64, iterations, 8);
}

export function createUserKeyMaterial() {
  return {
    authSaltB64: createPasswordSalt(),
    notePassSaltB64: createPasswordSalt(),
  };
}

