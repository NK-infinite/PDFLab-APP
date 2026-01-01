import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';
import { Buffer } from 'buffer';
import { addmyMetadata } from '../defultServices/myMeta';

export type PageType = 'blank' | 'existing';

export const addPageToPDF = async (
  fileUri: string,
  fileName: string,
  pageType: PageType,
  pageIndex?: number,
): Promise<string | null> => {
  try {
    const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBase64);

    if (pageType === 'blank') {
      pdfDoc.addPage();
    }

    if (pageType === 'existing') {
      const pages = pdfDoc.getPages();

      if (pages.length === 0) {
        Alert.alert('Error', 'PDF has no pages');
        return null;
      }

      const indexToCopy = pageIndex ?? 0;

      if (indexToCopy < 0 || indexToCopy >= pages.length) {
        Alert.alert('Error', 'Invalid page number');
        return null;
      }

      const [copiedPage] = await pdfDoc.copyPages(pdfDoc, [indexToCopy]);
      pdfDoc.addPage(copiedPage);
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');

    const outputPath =
      `${RNFS.DownloadDirectoryPath}/AddPage_${Date.now()}_${fileName}`;
      
      await RNFS.writeFile(outputPath, pdfBase64Out, 'base64');
      
     const result = await addmyMetadata(
      pdfDoc, 
      `AddPage_${fileName}`,
      'edit',
      outputPath,
      'Added page by PDfLab',
      ['addpage', 'edit']
    );
      if (!result) throw new Error("Metadata failed");
   
    await RNFS.writeFile(outputPath, result.base64, 'base64');
    return outputPath;
  
  } catch (error) {
    console.error('Add Page Service Error:', error);
    Alert.alert('Error', 'Failed to add page to PDF');
    return null;
  }
};
