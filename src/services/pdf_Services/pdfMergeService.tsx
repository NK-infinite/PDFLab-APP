import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';
import { Buffer } from 'buffer';
import FileViewer from 'react-native-file-viewer';
import { PDFFile } from './pdfPickerService';
import { addmyMetadata } from '../AppPersonalServices/myMeta';

export const openPDF = async (uri: string) => {
  try {
    await FileViewer.open(uri);
  } catch (err) {
    console.log("Error opening PDF:", err);
  }
};

export const mergePDFs = async (files: PDFFile[]): Promise<PDFFile | null> => {
  if (files.length < 2) {
    Alert.alert('Select at least 2 PDFs to merge!');
    return null;
  }

  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = await RNFS.readFile(file.uri, 'base64');
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getFullYear()}_${now.getHours().toString().padStart(2, '0')}-${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfBase64 = Buffer.from(mergedPdfBytes).toString('base64');
    const savePath = `${RNFS.DownloadDirectoryPath}/merged_${date}.pdf`;

    await RNFS.writeFile(savePath, mergedPdfBase64, 'base64');
    //my metadata 
    const result = await addmyMetadata(
      mergedPdf,
      `NumberedPDF_${Date.now()}.pdf`,
      'edit',
      savePath,
      'page Numbere add by PDFLab',
      ['merge', 'edit']
    );
    if (!result) throw new Error("Metadata failed");

    await RNFS.writeFile(savePath, result.base64, 'base64');

    Alert.alert(`Merged PDF saved at: ${savePath}`);

    return { name: 'merged.pdf', uri: savePath };
  } catch (err) {
    console.log('Error merging PDFs:', err);
    Alert.alert('Error merging PDFs. See console for details.');
    return null;
  }
};
