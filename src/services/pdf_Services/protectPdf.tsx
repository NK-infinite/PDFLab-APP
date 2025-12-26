import RNFS from 'react-native-fs';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';
import { decode as atob } from "base-64";
import { encode as btoa } from "base-64";
function base64ToUint8Array(base64: string) {
  const raw = atob(base64);
  const uint8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return uint8Array;
}

function uint8ArrayToBase64(uint8Array: Uint8Array) {
  let binary = '';
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

export const protectPDFFile = async (fileUri: string, password: string) => {
  try {
    // 1. Read PDF as base64
    const base64pdf = await RNFS.readFile(fileUri, 'base64');

    // 2. Convert to Uint8Array
    const pdfBytes = base64ToUint8Array(base64pdf);

    // 3. Encrypt
    const encryptedBytes = await encryptPDF(pdfBytes, password);

    // 4. Convert back to base64
    const encryptedBase64 = uint8ArrayToBase64(encryptedBytes);

    // 5. Save file
    const outputPath =
      RNFS.DownloadDirectoryPath + '/ProtectedPDF_' + Date.now() + '.pdf';
    await RNFS.writeFile(outputPath, encryptedBase64, 'base64');

    return outputPath;
  } catch (err) {
    console.error('Encrypt Error:', err);
    return null;
  }
};
