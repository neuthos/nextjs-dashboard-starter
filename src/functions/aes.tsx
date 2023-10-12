import * as CryptoJS from 'crypto-js';

export function encryptAES256(
  text: string,
  encryptionKey: string,
  iv: string
): string {
  const ciphertext = CryptoJS.AES.encrypt(text, encryptionKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });
  return ciphertext.toString();
}

export function decryptAES256(
  encryptedText: string,
  encryptionKey: string,
  iv: string
): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey, {
      iv: CryptoJS.enc.Hex.parse(iv),
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
}

export function generateRandomKey64Bit() {
  const randomBytes = CryptoJS.lib.WordArray.random(64);
  const randomHex = randomBytes.toString(CryptoJS.enc.Hex);

  return randomHex;
}
