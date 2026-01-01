import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import RNFS from 'react-native-fs';
import { addmyMetadata } from '../AppPersonalServices/myMeta';

type WatermarkOptions = {
  watermarkText: string;
  position: 'top-left' | 'center' | 'bottom-right';
  transparency: number;
  rotation: number;
  fontSize: number;
  fontColor: string;
};

const getRGB = (color: string) => {
  switch (color.toLowerCase()) {
    case 'red': return rgb(1, 0, 0);
    case 'blue': return rgb(0, 0, 1);
    case 'grey': return rgb(0.5, 0.5, 0.5);
    case 'white': return rgb(1, 1, 1);
    default: return rgb(0, 0, 0);
  }
};

export const Watermarkpdf = async (
  inputUri: string,
  options: WatermarkOptions
) => {
  try {
    const inputPath = inputUri.replace('file://', '');
    const pdfBase64 = await RNFS.readFile(inputPath, 'base64');

    const pdfDoc = await PDFDocument.load(pdfBase64, {
      ignoreEncryption: true,
    });

    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const color = getRGB(options.fontColor);

    for (const page of pages) {
      const { width, height } = page.getSize();

      let x = width / 2;
      let y = height / 2;

      switch (options.position) {
        case 'top-left':
          x = 50;
          y = height - 50;
          break;
        case 'bottom-right':
          x = width - 150;
          y = 50;
          break;
      }

      page.drawText(options.watermarkText, {
        x,
        y,
        size: options.fontSize,
        font,
        color,
        rotate: degrees(options.rotation),
        opacity: options.transparency,
      });
    }

    const outputPath = `${RNFS.DownloadDirectoryPath}/Watermarked_${Date.now()}.pdf`;
    const outputBase64 = await pdfDoc.saveAsBase64();

    await RNFS.writeFile(outputPath, outputBase64, 'base64');

    const result = await addmyMetadata(
      pdfDoc,
      `NumberedPDF_${Date.now()}.pdf`,
      'edit',
      outputPath,
      'Watermark pdf add by PDFLab',
      ['watermark', 'edit']
    );
    if (!result) throw new Error("Metadata failed");

    await RNFS.writeFile(outputPath, result.base64, 'base64');
    return { uri: outputPath };
  } catch (error) {
    console.error('Watermark Service Error:', error);
    throw error;
  }
};
