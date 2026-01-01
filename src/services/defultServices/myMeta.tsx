import AsyncStorage from '@react-native-async-storage/async-storage';
import { PDFDocument } from 'pdf-lib';
import DeviceInfo from 'react-native-device-info';
import { Buffer } from 'buffer';

const KEY = 'PDF_HISTORY';
const MAX_ITEMS = 50;

export type PdfItem = {
  id: string;
  name: string;
  path: string;
  type: 'text' | 'image' | 'merge' | 'edit';
  createdAt: number;
  creator: string;
  developer: string;
  appVersion: string;
  deviceInfo: string;
  size: number;
  lastModified: number;
  pages: number;
  description?: string;
  tags?: string[];
};

export const addmyMetadata = async (
  pdfDoc: PDFDocument,
  pdfName: string,
  type: 'text' | 'image' | 'edit',
  path: string,
  description?: string,
  tags?: string[]
): Promise<{ base64: string; meta: PdfItem } | null> => {
  
  try {
    pdfDoc.setTitle(pdfName || 'Untitled');
    pdfDoc.setAuthor(DeviceInfo.getBrand() || 'Local User');
    pdfDoc.setCreator('Nikhil');
    pdfDoc.setLanguage('en-US');
    pdfDoc.setKeywords(tags || []);
    pdfDoc.setProducer('PDFLab');
    pdfDoc.setSubject(description || '');
    pdfDoc.setModificationDate(new Date());

    // 2.
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    const pdfMeta: PdfItem = {
      id: Date.now().toString(),
      name: pdfName || 'Untitled',
      path: path,
      type,
      createdAt: Date.now(),
      creator: 'PDFLab',
      developer: 'Nikhil',
      appVersion: DeviceInfo.getVersion() || '1.0.0',
      deviceInfo: `${DeviceInfo.getBrand()} ${DeviceInfo.getSystemVersion()}`,
      size: pdfBytes.length,
      lastModified: Date.now(),
      pages: pdfDoc.getPageCount(),
      description: description || '',
      tags: tags || [],
    };

    // 4. Update AsyncStorage (History)
    const data = await AsyncStorage.getItem(KEY);
    const history = data ? JSON.parse(data) : [];
    history.unshift(pdfMeta);
    await AsyncStorage.setItem(KEY, JSON.stringify(history.slice(0, MAX_ITEMS)));

    return { base64: pdfBase64, meta: pdfMeta };
  } catch (err) {
    console.error('Metadata Error:', err);
    return null;
  }

};
