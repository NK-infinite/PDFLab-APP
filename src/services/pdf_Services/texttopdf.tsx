import { PDFDocument, StandardFonts } from 'pdf-lib';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { addmyMetadata } from '../AppPersonalServices/myMeta';

type CreatePdfParams = {
  text: string;
  outputName: string;
};

export const createPdfFromText = async ({
  text,
  outputName,
}: CreatePdfParams): Promise<string> => {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let page = pdfDoc.addPage();
    const { height } = page.getSize();

    const fontSize = 12;
    const margin = 40;
    let y = height - margin;

    const lines = text.split('\n');

    for (const line of lines) {
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }

      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
      });

      y -= fontSize + 6;
    }

    const pdfBytes = await pdfDoc.save();

    const path = `${RNFS.DownloadDirectoryPath}/${outputName}_${Date.now()}.pdf`;

    await RNFS.writeFile(
      path,
      Buffer.from(pdfBytes).toString('base64'),
      'base64'
    );
    const result = await addmyMetadata(
      pdfDoc,
      `NumberedPDF_${Date.now()}.pdf`,
      'edit',
      path,
      'Make pdf with text by PDFLab',
      ['text', 'edit']
    );
    if (!result) throw new Error("Metadata failed");

    await RNFS.writeFile(path, result.base64, 'base64');

    return path;
  } catch (error) {
    console.log('PDF Service Error:', error);
    throw error;
  }
};
