import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';
import { Buffer } from 'buffer';

interface PDFFile {
  name: string;
  uri: string;
}

export const compressPDF = async (file: PDFFile): Promise<PDFFile | null> => {
  try {
    // 1️ Read the PDF as base64
    console.log('1');

    const pdfBase64 = await RNFS.readFile(file.uri, 'base64');
    const pdfBytes = Buffer.from(pdfBase64, 'base64');

    console.log('2');
    // 2️ Load the existing PDF
    const oldPdf = await PDFDocument.load(pdfBytes);


    console.log('3');
    // 3️ Create a new PDF
    const newPdf = await PDFDocument.create();

    console.log('4');
    // 4️ Copy all pages from old PDF
    const pages = await newPdf.copyPages(oldPdf, oldPdf.getPageIndices());
    pages.forEach(page => newPdf.addPage(page));

    console.log('5');
    // 5️ Save the new PDF
    const newPdfBytes = await newPdf.save();
    const outputPath = `${RNFS.DownloadDirectoryPath}/compressed_${file.name}`;
    await RNFS.writeFile(outputPath, Buffer.from(newPdfBytes).toString('base64'), 'base64');

    return {
      name: `compressed_${file.name}`,
      uri: `file://${outputPath}`,
    };
  } catch (err) {
    console.error('PDF compression failed:', err);
    return null;
  }
};